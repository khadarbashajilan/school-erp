import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuizService } from './quiz.service';

@Controller('quizzes')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() createDto: any) {
    return this.quizService.createQuiz(createDto);
  }

  @Get()
  async getMyQuizzes() {
    return this.quizService.getMyQuizzes();
  }

  @Get(':id')
  async getQuizById(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Post(':id/publish')
  async publishQuiz(@Param('id') id: string) {
    return this.quizService.publishQuiz(id);
  }

  @Post(':id/cancel')
  async cancelQuiz(@Param('id') id: string, @Body() cancelDto: any) {
    return this.quizService.cancelQuiz(id, cancelDto);
  }

  @Post(':quizId/questions')
  async addQuestion(@Param('quizId') quizId: string, @Body() questionDto: any) {
    return this.quizService.addQuestion(quizId, questionDto);
  }
}