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

  @IsDateString()
  scheduledDate: string;

  @IsString()
  startTime: string;

  @IsInt()
  @Min(5)
  @Max(180)
  durationMinutes: number;
}