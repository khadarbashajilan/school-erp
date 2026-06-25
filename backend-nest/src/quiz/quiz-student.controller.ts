import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QuizAttemptService } from './quiz-attempt.service';
import { JoinQuizDto } from './dto/join-quiz.dto';
import { SaveAnswerDto } from './dto/save-answer.dto';

@ApiTags('Quiz (Student)')
@ApiBearerAuth()
@Controller('student/quizzes')
@UseGuards(JwtAuthGuard)
export class QuizStudentController {
  constructor(private readonly attemptService: QuizAttemptService) {}

  @ApiOperation({ summary: 'List all live quizzes available to students' })
  @Get()
  async getStudentQuizzes() {
    return this.attemptService.getStudentQuizzes();
  }

  @ApiOperation({ summary: 'Get quiz details (correct answers hidden)' })
  @Get(':id')
  async getQuizDetail(@Param('id') id: string) {
    return this.attemptService.getQuizDetail(id);
  }

  @ApiOperation({ summary: 'Join/register for a quiz' })
  @Post(':id/join')
  async joinQuiz(
    @Param('id') id: string,
    @Body() dto: JoinQuizDto,
    @CurrentUser() user: any,
  ) {
    return this.attemptService.joinQuiz(id, dto, user);
  }

  @ApiOperation({ summary: 'Start a quiz (seeds blank answer rows)' })
  @Post(':id/start')
  async startQuiz(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.startQuiz(id, user);
  }

  @ApiOperation({ summary: 'Save/update answer for a single question' })
  @Post(':id/answers/:questionId')
  async saveAnswer(
    @Param('id') id: string,
    @Param('questionId') questionId: string,
    @Body() dto: SaveAnswerDto,
    @CurrentUser() user: any,
  ) {
    return this.attemptService.saveAnswer(id, questionId, dto, user);
  }

  @ApiOperation({ summary: 'Submit quiz and get score' })
  @Post(':id/submit')
  async submitQuiz(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.submitQuiz(id, user);
  }

  @ApiOperation({ summary: 'Get quiz result (score + total)' })
  @Get(':id/result')
  async getResult(@Param('id') id: string, @CurrentUser() user: any) {
    return this.attemptService.getResult(id, user);
  }
}
