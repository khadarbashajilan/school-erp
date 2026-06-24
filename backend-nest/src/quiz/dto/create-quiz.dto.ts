import { IsString, IsNotEmpty, IsOptional, IsDateString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class CreateQuizDto {
  @IsString() 
  @IsNotEmpty() 
  title: string;

  @IsOptional() 
  @IsString() 
  description?: string;

  @IsString() 
  @IsNotEmpty() 
  classId: string;

  @IsString() 
  @IsNotEmpty() 
  className: string;

  @IsString() 
  @IsNotEmpty() 
  section: string;

  @IsString() 
  @IsNotEmpty() 
  subjectId: string;

  @IsString() 
  @IsNotEmpty() 
  subjectName: string;

  @IsDateString() // Validates format YYYY-MM-DD
  scheduledDate: string;

  @IsString() // Validates format HH:MM
  startTime: string;

  @IsInt() 
  @Min(5) 
  @Max(180) // Quiz must be between 5 and 180 minutes
  durationMinutes: number;

  @IsOptional() 
  @IsInt() 
  @Min(0) 
  @Max(60) 
  lateStartMinutes?: number; // Default is handled in entity (10)

  @IsOptional() 
  @IsInt() 
  @Min(1) 
  @Max(168) // Max 1 week delay for results
  resultReleaseHours?: number; // Default is handled in entity (24)

  @IsOptional() 
  @IsBoolean() 
  allowReviewBeforeSubmit?: boolean;

  @IsOptional() 
  @IsBoolean() 
  showAnswerAfterResult?: boolean;
}