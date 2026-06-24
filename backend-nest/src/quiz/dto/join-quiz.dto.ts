import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class JoinQuizDto {
  @IsString() 
  @IsNotEmpty() 
  studentName: string;

  @IsOptional() 
  @IsString() 
  rollNumber?: string;
}