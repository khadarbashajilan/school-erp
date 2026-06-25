import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QuizAttemptService } from './quiz-attempt.service';
import { JoinQuizDto } from './dto/join-quiz.dto';
import { SaveAnswerDto } from './dto/save-answer.dto';

// All student quiz routes start with /api/student/quizzes
@Controller('student/quizzes')
@UseGuards(JwtAuthGuard)
export class QuizStudentController {
  constructor(private readonly attemptService: QuizAttemptService) {}

  // GET /api/student/quizzes — view all live quizzes
  @Get()
  async getStudentQuizzes() {
    return this.attemptService.getStudentQuizzes();
  }

  // GET /api/student/quizzes/:id — quiz details (no correct answers)
  @Get(':id')
  async getQuizDetail(@Param('id') id: string) {
    return this.attemptService.getQuizDetail(id);
  }

  // POST /api/student/quizzes/:id/join — register for the quiz
  @Post(':id/join')
  async joinQuiz(
    @Param('id') id: string,
    @Body() dto: JoinQuizDto,
    @CurrentUser() user: any,
  ) {
    return this.attemptService.joinQuiz(id, dto, user);
  }

  // POST /api/student/quizzes/:id/start — begin + seed blank answer rows
  @Post(':id/start')
  async startQuiz(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.startQuiz(id, user);
  }

  // POST /api/student/quizzes/:id/answers/:questionId — save one answer
  @Post(':id/answers/:questionId')
  async saveAnswer(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @Body() dto: SaveAnswerDto,
    @CurrentUser() user: any,
  ) {
    return this.attemptService.saveAnswer(id, questionId, dto, user);
  }

  // POST /api/student/quizzes/:id/submit — final submit + score
  @Post(':id/submit')
  async submitQuiz(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.submitQuiz(id, user);
  }

  // GET /api/student/quizzes/:id/result — get score after submission
  @Get(':id/result')
  async getResult(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.getResult(id, user);
  }
}
