import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity } from '../database/entities/quiz.entity';
import { QuizAttemptEntity } from '../database/entities/quiz-attempt.entity';
import { QuizAnswerEntity } from '../database/entities/quiz-answer.entity';

// @Injectable() allows NestJS to inject this service into QuizStudentController
@Injectable()
export class QuizAttemptService {
  constructor(
    // Need QuizEntity to check if quiz is LIVE and get its questions
    @InjectRepository(QuizEntity)
    private quizRepository: Repository<QuizEntity>,
    // Need QuizAttemptEntity to track the student's session
    @InjectRepository(QuizAttemptEntity)
    private attemptRepository: Repository<QuizAttemptEntity>,
    // Need QuizAnswerEntity to save individual answers
    @InjectRepository(QuizAnswerEntity)
    private answerRepository: Repository<QuizAnswerEntity>,
  ) {}

  // Student views available quizzes for their class (stub)
  async getStudentQuizzes() {
    return { message: 'Student quizzes list stub' };
  }

  // Student views a quiz card (no correct answers) (stub)
  async getQuizDetail(id: string) {
    return { message: 'Quiz detail stub' };
  }

  // Student enters waiting room — creates an attempt row (stub)
  async joinQuiz(quizId: string, dto: any) {
    return { message: 'Joined waiting room stub' };
  }

  // Student starts quiz — seeds answer rows for all questions (stub)
  async startQuiz(quizId: string) {
    return { message: 'Quiz started stub' };
  }

  // Auto-save a single answer (stub)
  async saveAnswer(quizId: string, questionId: string, dto: any) {
    return { message: 'Answer saved stub' };
  }

  // Student submits — locks attempt, runs scoring (stub)
  async submitQuiz(quizId: string) {
    return { message: 'Quiz submitted stub' };
  }

  // Student views their score (stub)
  async getResult(quizId: string) {
    return { message: 'Result retrieval stub' };
  }
}