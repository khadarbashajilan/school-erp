import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity, QuizStatus } from '../database/entities/quiz.entity';
import { QuizAttemptEntity, AttemptStatus } from '../database/entities/quiz-attempt.entity';
import { QuizAnswerEntity } from '../database/entities/quiz-answer.entity';
import { QuizQuestionEntity } from '../database/entities/quiz-question.entity';
import { QuizResultService } from './quiz-result.service';
import { JoinQuizDto } from './dto/join-quiz.dto';
import { SaveAnswerDto } from './dto/save-answer.dto';

@Injectable()
export class QuizAttemptService {
  constructor(
    @InjectRepository(QuizEntity)
    private quizRepository: Repository<QuizEntity>,
    @InjectRepository(QuizAttemptEntity)
    private attemptRepository: Repository<QuizAttemptEntity>,
    @InjectRepository(QuizAnswerEntity)
    private answerRepository: Repository<QuizAnswerEntity>,
    @InjectRepository(QuizQuestionEntity)
    private questionRepository: Repository<QuizQuestionEntity>,
    // Injecting another service (not a repo) — NestJS auto-resolves it
    private resultService: QuizResultService,
  ) {}

  // List all LIVE quizzes for students
  async getStudentQuizzes() {
    return this.quizRepository.find({
      where: { status: QuizStatus.LIVE },
      order: { scheduledAt: 'ASC' },
    });
  }

  // Show quiz details to student — WITHOUT correct answers
  async getQuizDetail(id: string) {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz not found');

    const questions = await this.questionRepository.find({
      where: { quizId: id },
      order: { orderIndex: 'ASC' },
    });

    // Destructure to remove correctAnswer before sending to client
    const safeQuestions = questions.map(({ correctAnswer, ...rest }) => rest);

    return { ...quiz, questions: safeQuestions };
  }

  // Student registers interest (creates an attempt record)
  async joinQuiz(quizId: string, dto: JoinQuizDto, user: any) {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // Prevent duplicate joins
    const existing = await this.attemptRepository.findOne({
      where: { quizId, studentId: user.studentId || user.id },
    });
    if (existing) throw new BadRequestException('Already joined this quiz');

    const attempt = this.attemptRepository.create({
      quizId,
      studentId: user.studentId || user.id,
      status: AttemptStatus.IN_PROGRESS,
      schoolId: user.schoolId || 'school_001',
    });

    return this.attemptRepository.save(attempt);
  }

  // Student begins quiz — creates answer rows for every question
  async startQuiz(quizId: string, user: any) {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException('Quiz not found');

    let attempt = await this.attemptRepository.findOne({
      where: { quizId, studentId: user.studentId || user.id },
    });

    // Auto-join if they haven't explicitly joined
    if (!attempt) {
      attempt = this.attemptRepository.create({
        quizId,
        studentId: user.studentId || user.id,
        status: AttemptStatus.IN_PROGRESS,
        schoolId: user.schoolId || 'school_001',
      });
      attempt = await this.attemptRepository.save(attempt);
    }

    if (attempt.status !== AttemptStatus.IN_PROGRESS) {
      throw new BadRequestException('Attempt is already submitted');
    }

    // Seed one answer row per question (all null initially)
    // So the student has blank slots to fill
    const existingAnswers = await this.answerRepository.count({
      where: { attemptId: attempt.id },
    });

    if (existingAnswers === 0) {
      const questions = await this.questionRepository.find({
        where: { quizId },
        order: { orderIndex: 'ASC' },
      });

      const answerRows = questions.map((q) =>
        this.answerRepository.create({
          attemptId: attempt.id,
          questionId: q.id,
        }),
      );

      await this.answerRepository.save(answerRows);
    }

    attempt.startedAt = new Date();
    await this.attemptRepository.save(attempt);

    return { attemptId: attempt.id, startedAt: attempt.startedAt };
  }

  // Save (or update) the student's answer for one question
  // Called each time they change an answer — upsert pattern
  async saveAnswer(quizId: string, questionId: string, dto: SaveAnswerDto, user: any) {
    const attempt = await this.attemptRepository.findOne({
      where: { quizId, studentId: user.studentId || user.id, status: AttemptStatus.IN_PROGRESS },
    });
    if (!attempt) throw new NotFoundException('Active attempt not found');

    let answer = await this.answerRepository.findOne({
      where: { attemptId: attempt.id, questionId },
    });

    if (answer) {
      answer.givenAnswer = dto.givenAnswer; // update existing
    } else {
      answer = this.answerRepository.create({
        attemptId: attempt.id,
        questionId,
        givenAnswer: dto.givenAnswer,
      });
    }

    return this.answerRepository.save(answer);
  }

  // Final submission — mark as SUBMITTED and calculate score
  async submitQuiz(quizId: string, user: any) {
    const attempt = await this.attemptRepository.findOne({
      where: { quizId, studentId: user.studentId || user.id, status: AttemptStatus.IN_PROGRESS },
    });
    if (!attempt) throw new NotFoundException('Active attempt not found');

    attempt.status = AttemptStatus.SUBMITTED;
    attempt.submittedAt = new Date();
    await this.attemptRepository.save(attempt);

    // Delegate scoring to QuizResultService
    const result = await this.resultService.calculateScore(attempt.id);

    return {
      attemptId: attempt.id,
      submittedAt: attempt.submittedAt,
      ...result,
    };
  }

  // Get score after submission
  async getResult(quizId: string, user: any) {
    const attempt = await this.attemptRepository.findOne({
      where: { quizId, studentId: user.studentId || user.id },
    });
    if (!attempt) throw new NotFoundException('Attempt not found');
    if (attempt.status !== AttemptStatus.SUBMITTED) {
      throw new BadRequestException('Quiz not submitted yet');
    }

    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    const questions = await this.questionRepository.find({ where: { quizId } });
    const totalMarks = questions.reduce((sum, q) => sum + Number(q.marks), 0);

    return {
      attemptId: attempt.id,
      score: attempt.score,
      total: totalMarks,
      submittedAt: attempt.submittedAt,
    };
  }
}
