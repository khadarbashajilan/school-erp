import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuizService } from './quiz.service';

// @Controller sets the base path for all routes in this class
// Every route here will be prefixed with /quizzes
@Controller('quizzes')
// @UseGuards(JwtAuthGuard) protects every route — user must be logged in
@UseGuards(JwtAuthGuard)
export class QuizController {
  // Dependency injection: NestJS creates QuizService and passes it here
  constructor(private readonly quizService: QuizService) {}

  // POST /quizzes — Teacher creates a new quiz draft
  @Post()
  async createQuiz(@Body() createDto: any) {
    return this.quizService.createQuiz(createDto);
  }

  // GET /quizzes — List all quizzes created by the logged-in teacher
  @Get()
  async getMyQuizzes() {
    return this.quizService.getMyQuizzes();
  }

  // GET /quizzes/:id — Get full quiz details including questions
  @Get(':id')
  async getQuizById(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  // POST /quizzes/:id/publish — Changes quiz status from DRAFT to LIVE
  @Post(':id/publish')
  async publishQuiz(@Param('id') id: string) {
    return this.quizService.publishQuiz(id);
  }

  // POST /quizzes/:quizId/questions — Adds a question to a quiz draft
  @Post(':quizId/questions')
  async addQuestion(@Param('quizId') quizId: string, @Body() questionDto: any) {
    return this.quizService.addQuestion(quizId, questionDto);
  }
}