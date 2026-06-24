import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity } from '../database/entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity) 
    private quizRepository: Repository<QuizEntity>
  ) {}

  async createQuiz(dto: any) {
    return { message: 'Quiz created stub' };
  }

  async getMyQuizzes() {
    return { message: 'My quizzes list stub' };
  }

  async getQuizById(id: string) {
    return { message: `Quiz ${id} detail stub` };
  }

  async publishQuiz(id: string) {
    return { message: 'Quiz published stub' };
  }

  async cancelQuiz(id: string, dto: any) {
    return { message: 'Quiz cancelled stub' };
  }

  async addQuestion(quizId: string, dto: any) {
    return { message: 'Question added stub' };
  }
}