import { IsArray, ValidateNested, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionOrderDto {
  @IsString() 
  questionId: string;

  @IsInt() 
  newOrderIndex: number;
}

export class ReorderQuestionsDto {
  @IsArray() 
  @ValidateNested({ each: true }) 
  @Type(() => QuestionOrderDto) 
  order: QuestionOrderDto[];
}