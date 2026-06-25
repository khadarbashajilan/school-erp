import { IsEnum, IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionType } from '../../database/entities/quiz-question.entity';

// Sub-DTO for each option inside the options array
class OptionDto {
  @IsString()
  id: string;

  @IsString()
  text: string;
}

export class CreateQuestionDto {
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @IsString()
  @IsNotEmpty()
  questionText: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) // run OptionDto validation on each array element
  @Type(() => OptionDto)           // tells class-transformer how to cast the nested objects
  options?: OptionDto[];

  // No @Is decorator — validated manually in the service or left flexible for jsonb
  correctAnswer: string | string[];

  @IsNumber()
  @Min(0.5)
  marks: number;
}