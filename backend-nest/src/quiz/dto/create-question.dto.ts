import { IsEnum, IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../../database/entities/quiz-question.entity';

// Helper class to validate the shape of each option
class OptionDto {
  @IsString() 
  id: string; // e.g., 'A', 'B', 'C', 'D' or 'True', 'False'

  @IsString() 
  text: string; // The actual text shown to the student
}

export class CreateQuestionDto {
  @IsEnum(QuestionType) 
  questionType: QuestionType;

  @IsString() 
  @IsNotEmpty() 
  questionText: string;

  // @ValidateNested tells NestJS to look inside the array and 
  // validate each item using the OptionDto class.
  @IsOptional() 
  @IsArray() 
  @ValidateNested({ each: true }) 
  @Type(() => OptionDto) 
  options?: OptionDto[];

  // We leave this as a union type because it can be a string ('A') or an array (['A', 'C'])
  // The actual validation of the answer shape happens in the Service.
  correctAnswer: string | string[];

  @IsOptional() 
  @IsString() 
  explanation?: string;

  @IsNumber() 
  @Min(0.5) // Questions must be worth at least 0.5 marks
  marks: number;
}