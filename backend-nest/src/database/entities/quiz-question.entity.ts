import {
  Entity, PrimaryGeneratedColumn, Column,
  Index, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';


export enum QuestionType {
  MCQ_SINGLE = 'mcq_single',
  MCQ_MULTI  = 'mcq_multi',
  TRUE_FALSE = 'true_false',
  FILL_BLANK = 'fill_blank',
}

@Entity('quiz_questions')

@Index(['quizId', 'orderIndex'])
export class QuizQuestionEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // This column links this question to the QuizEntity. 
  // In a full implementation, you might use @ManyToOne, but starting with a 
  // simple string ID is easier for beginners to understand.
  @Column({ name: 'quiz_id', type: 'uuid' })
  quizId: string;

  @Column({ name: 'order_index', type: 'int' })
  orderIndex: number;

  @Column({ name: 'question_type', length: 30 })
  questionType: QuestionType;

  @Column({ name: 'question_text', type: 'text' })
  questionText: string;

  // 'jsonb' is a special PostgreSQL type that stores JSON data in a binary format.
  // It's perfect here because we can store an array of options without needing a separate 'Options' table.
  // Shape: [{ id: 'A', text: 'Option 1' }, { id: 'B', text: 'Option 2' }]
  @Column({ name: 'options', type: 'jsonb', nullable: true })
  options: { id: string; text: string }[] | null;

  // ⚠️ SECURITY WARNING: This field must NEVER be sent to the student 
  // during the quiz attempt. It is only used by the Teacher and the Scoring Service.
  // - MCQ_SINGLE: stores 'A'
  // - MCQ_MULTI: stores ['A', 'C']
  // - FILL_BLANK: stores ['Answer 1', 'Answer 2'] (accepted variations)
  @Column({ name: 'correct_answer', type: 'jsonb' })
  correctAnswer: string | string[];

  @Column({ name: 'explanation', type: 'text', nullable: true })
  explanation: string | null;

  @Column({ name: 'marks', type: 'numeric', precision: 5, scale: 2, default: 1 })
  marks: number;

  // This helps the teacher see at a glance which questions they forgot to finish
  // before trying to publish the quiz.
  @Column({ name: 'is_complete', type: 'boolean', default: false })
  isComplete: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}