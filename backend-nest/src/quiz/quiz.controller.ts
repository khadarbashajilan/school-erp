import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('quizzes')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() dto: CreateQuizDto, @CurrentUser() user: any) {
    return this.quizService.createQuiz(dto, user);
  }

  @Get()
  async getMyQuizzes(@CurrentUser() user: any) {
    return this.quizService.getMyQuizzes(user);
  }

  @Get(':id')
  async getQuizById(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Post(':id/publish')
  async publishQuiz(@Param('id') id: string) {
    return this.quizService.publishQuiz(id);
  }

  @Post(':quizId/questions')
  async addQuestion(
    @Param('quizId') quizId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.quizService.addQuestion(quizId, dto);
  }
}
