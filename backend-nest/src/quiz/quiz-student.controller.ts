import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuizAttemptService } from './quiz-attempt.service';

// All routes prefixed with /student/quizzes — separate from teacher routes
@Controller('student/quizzes')
@UseGuards(JwtAuthGuard)
export class QuizStudentController {
  constructor(private readonly attemptService: QuizAttemptService) {}

  // GET /student/quizzes — Lists quizzes available for the student's class/section
  @Get()
  async getStudentQuizzes() {
    return this.attemptService.getStudentQuizzes();
  }

  // GET /student/quizzes/:id — Quiz card info (NO correct answers sent)
  @Get(':id')
  async getQuizDetail(@Param('id') id: string) {
    return this.attemptService.getQuizDetail(id);
  }

  // POST /student/quizzes/:id/join — Creates an attempt row, enters "waiting room"
  @Post(':id/join')
  async joinQuiz(@Param('id') id: string, @Body() joinDto: any) {
    return this.attemptService.joinQuiz(id, joinDto);
  }

  // POST /student/quizzes/:id/start — Seeds answer rows, timer starts
  @Post(':id/start')
  async startQuiz(@Param('id') id: string) {
    return this.attemptService.startQuiz(id);
  }

  // POST /student/quizzes/:id/answers/:questionId — Auto-save a single answer
  @Post(':id/answers/:questionId')
  async saveAnswer(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @Body() answerDto: any,
  ) {
    return this.attemptService.saveAnswer(id, questionId, answerDto);
  }

  // POST /student/quizzes/:id/submit — Locks attempt, runs scoring
  @Post(':id/submit')
  async submitQuiz(@Param('id') id: string) {
    return this.attemptService.submitQuiz(id);
  }

  // GET /student/quizzes/:id/result — Returns score (only if submitted)
  @Get(':id/result')
  async getResult(@Param('id') id: string) {
    return this.attemptService.getResult(id);
  }
}