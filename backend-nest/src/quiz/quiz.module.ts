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

@Module({
  // 1. Tell TypeORM which entities this module will use
  imports: [
    TypeOrmModule.forFeature([
      QuizEntity, 
      QuizQuestionEntity, 
      QuizAttemptEntity, 
      QuizAnswerEntity
    ]),
  ],
  // 2. The Gatekeepers (HTTP endpoints)
  controllers: [QuizController, QuizStudentController],
  // 3. The Managers (Business Logic)
  providers: [
    QuizService, 
    QuizAttemptService, 
    QuizResultService
  ],
})
export class QuizModule {}