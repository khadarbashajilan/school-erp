import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity } from '../database/entities/quiz.entity';
import { QuizQuestionEntity } from '../database/entities/quiz-question.entity';

// @Injectable() tells NestJS this class can be injected into controllers
@Injectable()
export class QuizService {
  constructor(
    // InjectRepository gives us access to the Quiz table
    @InjectRepository(QuizEntity)
    private quizRepository: Repository<QuizEntity>,
    // We also need access to QuizQuestion table for adding questions
    @InjectRepository(QuizQuestionEntity)
    private questionRepository: Repository<QuizQuestionEntity>,
  ) {}

  // Teacher creates a new quiz (stub — logic comes later)
  async createQuiz(dto: any) {
    return { message: 'Quiz created stub' };
  }

  // Teacher views all their quizzes (stub)
  async getMyQuizzes() {
    return { message: 'My quizzes list stub' };
  }

  // Teacher views a single quiz with its questions (stub)
  async getQuizById(id: string) {
    return { message: `Quiz ${id} detail stub` };
  }

  // Teacher publishes — moves DRAFT to LIVE (stub)
  async publishQuiz(id: string) {
    return { message: 'Quiz published stub' };
  }

  // Teacher adds a question to a draft quiz (stub)
  async addQuestion(quizId: string, dto: any) {
    return { message: 'Question added stub' };
  }
}