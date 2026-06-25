import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from '../database/entities/quiz.entity';
import { QuizQuestionEntity } from '../database/entities/quiz-question.entity';
import { QuizAttemptEntity } from '../database/entities/quiz-attempt.entity';
import { QuizAnswerEntity } from '../database/entities/quiz-answer.entity';
import { QuizController } from './quiz.controller';
import { QuizStudentController } from './quiz-student.controller';
import { QuizService } from './quiz.service';
import { QuizAttemptService } from './quiz-attempt.service';
import { QuizResultService } from './quiz-result.service';

// @Module() ties everything together — NestJS uses this to know what to register
@Module({
  // TypeOrmModule.forFeature() makes these repositories injectable in this module's services
  imports: [
    TypeOrmModule.forFeature([
      QuizEntity, 
      QuizQuestionEntity, 
      QuizAttemptEntity, 
      QuizAnswerEntity
    ]),
  ],
  // Controllers handle HTTP requests and delegate to services
  controllers: [QuizController, QuizStudentController],
  // Providers = services that can be injected (@Injectable) into controllers or other services
  providers: [
    QuizService, 
    QuizAttemptService, 
    QuizResultService
  ],
})
export class QuizModule {}