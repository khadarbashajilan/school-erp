// DTO = Data Transfer Object — validates the shape of incoming request bodies
// These decorators (@IsString, @IsNotEmpty) are auto-run by NestJS's ValidationPipe
import { IsString, IsNotEmpty, IsDateString, IsInt, Min, Max } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  classId: string;

  @IsString()
  @IsNotEmpty()
  section: string;

  @IsString()
  @IsNotEmpty()
  subjectId: string;

  // Expects "2026-07-15" format
  @IsDateString()
  scheduledDate: string;

  // Expects "10:30" format (combined with scheduledDate in the service)
  @IsString()
  startTime: string;

  @IsInt()
  @Min(5)    // minimum 5 minutes
  @Max(180)  // maximum 3 hours
  durationMinutes: number;
}