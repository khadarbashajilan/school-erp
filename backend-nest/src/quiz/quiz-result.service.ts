import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAttemptEntity } from '../database/entities/quiz-attempt.entity';
import { QuizAnswerEntity } from '../database/entities/quiz-answer.entity';
import { QuizQuestionEntity } from '../database/entities/quiz-question.entity';

@Injectable()
export class QuizResultService {
  constructor(
    @InjectRepository(QuizAnswerEntity)
    private answerRepository: Repository<QuizAnswerEntity>,
    @InjectRepository(QuizQuestionEntity)
    private questionRepository: Repository<QuizQuestionEntity>,
    @InjectRepository(QuizAttemptEntity)
    private attemptRepository: Repository<QuizAttemptEntity>,
  ) {}

  // Compare each answer against the question's correctAnswer, assign marks
  async calculateScore(attemptId: string) {
    const attempt = await this.attemptRepository.findOne({ where: { id: attemptId } });
    if (!attempt) throw new NotFoundException('Attempt not found');

    // Fetch all answers for this attempt + all questions for this quiz
    const answers = await this.answerRepository.find({ where: { attemptId } });
    const questions = await this.questionRepository.find({
      where: { quizId: attempt.quizId },
    });

    let totalScore = 0;

    for (const answer of answers) {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question || answer.givenAnswer === null) continue; // unanswered = 0 marks

      let correct = false;

      // MCQ & True/False: exact string match
      if (question.questionType === 'mcq_single' || question.questionType === 'true_false') {
        correct = answer.givenAnswer === question.correctAnswer;
      }

      // Fill-in-the-blank: case-insensitive, any accepted answer
      if (question.questionType === 'fill_blank') {
        const accepted = (question.correctAnswer as string[]).map((a) => a.toLowerCase().trim());
        const given = String(answer.givenAnswer || '').toLowerCase().trim();
        correct = accepted.includes(given);
      }

      const marks = correct ? Number(question.marks) : 0;
      answer.marksObtained = marks;
      totalScore += marks;
    }

    // Persist per-question marks and total score
    await this.answerRepository.save(answers);
    attempt.score = totalScore;
    await this.attemptRepository.save(attempt);

    const totalMarks = questions.reduce((sum, q) => sum + Number(q.marks), 0);

    return { score: totalScore, total: totalMarks };
  }
}
