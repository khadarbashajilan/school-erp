import { IsEnum, IsInt, Min } from 'class-validator';
import { AnswerStatus } from '../../database/entities/quiz-answer.entity';

export class SaveAnswerDto {
  // can be string, string array, or null (if user clears answer)
  givenAnswer: string | string[] | null;

  @IsEnum(AnswerStatus) 
  answerStatus: AnswerStatus; // e.g., 'answered' or 'marked_for_review'

  @IsInt() 
  @Min(0) 
  remainingSeconds: number; // Sent from frontend timer to keep DB in sync
}