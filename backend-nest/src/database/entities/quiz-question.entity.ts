import {
  Entity, PrimaryGeneratedColumn, Column,
  Index, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

export enum QuestionType {
  MCQ_SINGLE = 'mcq_single',
  TRUE_FALSE = 'true_false',
  FILL_BLANK = 'fill_blank',
}

@Entity('quiz_questions')
@Index(['quizId', 'orderIndex'])
export class QuizQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_id', type: 'uuid' })
  quizId: string;

  @Column({ name: 'order_index', type: 'int' })
  orderIndex: number;

  @Column({ name: 'question_type', length: 30 })
  questionType: QuestionType;

  @Column({ name: 'question_text', type: 'text' })
  questionText: string;

  @Column({ name: 'options', type: 'jsonb', nullable: true })
  options: { id: string; text: string }[] | null;

  @Column({ name: 'correct_answer', type: 'jsonb' })
  correctAnswer: string | string[];

  @Column({ name: 'marks', type: 'numeric', precision: 5, scale: 2, default: 1 })
  marks: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}