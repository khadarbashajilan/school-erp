import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuizAttemptService } from './quiz-attempt.service';

@Controller('student/quizzes')
@UseGuards(JwtAuthGuard)
export class QuizStudentController {
  constructor(private readonly attemptService: QuizAttemptService) {}

  @Get()
  async getStudentQuizzes() {
    return this.attemptService.getStudentQuizzes();
  }

  @Get(':id')
  async getQuizDetail(@Param('id') id: string) {
    return this.attemptService.getQuizDetail(id);
  }

  @Post(':id/join')
  async joinQuiz(@Param('id') id: string, @Body() joinDto: any) {
    return this.attemptService.joinQuiz(id, joinDto);
  }

  @Post(':id/start')
  async startQuiz(@Param('id') id: string) {
    return this.attemptService.startQuiz(id);
  }

  @Post(':id/answers/:questionId')
  async saveAnswer(@Param('id') id: string, @Param('questionId') qId: string, @Body() answerDto: any) {
    return this.attemptService.saveAnswer(id, qId, answerDto);
  }

  @Post(':id/submit')
  async submitQuiz(@Param('id') id: string) {
    return this.attemptService.submitQuiz(id);
  }

  @Get(':id/result')
  async getResult(@Param('id') id: string) {
    return this.attemptService.getResult(id);
  }
}