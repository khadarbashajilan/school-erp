import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAnswerEntity } from '../database/entities/quiz-answer.entity';
import { QuizQuestionEntity } from '../database/entities/quiz-question.entity';
import { QuizAttemptEntity } from '../database/entities/quiz-attempt.entity';

// @Injectable() allows this service to be injected into QuizAttemptService
@Injectable()
export class QuizResultService {
  constructor(
    // Need QuizAnswerEntity to get the student's given answers
    @InjectRepository(QuizAnswerEntity)
    private answerRepository: Repository<QuizAnswerEntity>,
    // Need QuizQuestionEntity to get the correct answers for comparison
    @InjectRepository(QuizQuestionEntity)
    private questionRepository: Repository<QuizQuestionEntity>,
    // Need QuizAttemptEntity to save the final calculated score
    @InjectRepository(QuizAttemptEntity)
    private attemptRepository: Repository<QuizAttemptEntity>,
  ) {}

  // Called by QuizAttemptService.submitQuiz() after locking the attempt
  // Compares givenAnswer vs correctAnswer for each question
  async calculateScore(attemptId: string) {
    // Logic comes in implementation phasePlan·
    return { score: 0, total: 0 };
  }
}