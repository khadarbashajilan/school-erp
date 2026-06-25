import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

// @Controller('quizzes') makes all routes here start with /api/quizzes
// @UseGuards(JwtAuthGuard) = every route requires a valid JWT token
@Controller('quizzes')
@UseGuards(JwtAuthGuard)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  // POST /api/quizzes — create a draft quiz
  @Post()
  async createQuiz(@Body() dto: CreateQuizDto, @CurrentUser() user: any) {
    return this.quizService.createQuiz(dto, user);
  }

  // GET /api/quizzes — list the teacher's quizzes
  @Get()
  async getMyQuizzes(@CurrentUser() user: any) {
    return this.quizService.getMyQuizzes(user);
  }

  // GET /api/quizzes/:id — get quiz with its questions
  @Get(':id')
  async getQuizById(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  // POST /api/quizzes/:id/publish — make quiz visible to students
  @Post(':id/publish')
  async publishQuiz(@Param('id') id: string) {
    return this.quizService.publishQuiz(id);
  }

  // POST /api/quizzes/:quizId/questions — add a question
  @Post(':quizId/questions')
  async addQuestion(
    @Param('quizId') quizId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.quizService.addQuestion(quizId, dto);
  }
}
