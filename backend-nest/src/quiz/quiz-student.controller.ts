import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QuizAttemptService } from './quiz-attempt.service';
import { JoinQuizDto } from './dto/join-quiz.dto';
import { SaveAnswerDto } from './dto/save-answer.dto';

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
  async joinQuiz(
    @Param('id') id: string,
    @Body() dto: JoinQuizDto,
    @CurrentUser() user: any,
  ) {
    return this.attemptService.joinQuiz(id, dto, user);
  }

  @Post(':id/start')
  async startQuiz(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.startQuiz(id, user);
  }

  @Post(':id/answers/:questionId')
  async saveAnswer(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @Body() dto: SaveAnswerDto,
    @CurrentUser() user: any,
  ) {
    return this.attemptService.saveAnswer(id, questionId, dto, user);
  }

  @Post(':id/submit')
  async submitQuiz(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.submitQuiz(id, user);
  }

  @Get(':id/result')
  async getResult(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.getResult(id, user);
  }
}
