import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizAttemptEntity } from '../database/entities/quiz-attempt.entity';

@Injectable()
export class QuizAttemptService {
  constructor(
    @InjectRepository(QuizAttemptEntity)
    private attemptRepository: Repository<QuizAttemptEntity>
  ) {}

  async getStudentQuizzes() {
    return { message: 'Student quizzes list stub' };
  }

  async getQuizDetail(id: string) {
    return { message: 'Quiz detail stub' };
  }

  async joinQuiz(quizId: string, dto: any) {
    return { message: 'Joined waiting room stub' };
  }

  async startQuiz(quizId: string) {
    return { message: 'Quiz started stub' };
  }

  async saveAnswer(quizId: string, questionId: string, dto: any) {
    return { message: 'Answer saved stub' };
  }

  async submitQuiz(quizId: string) {
    return { message: 'Quiz submitted stub' };
  }

  async getResult(quizId: string) {
    return { message: 'Result retrieval stub' };
  }
}