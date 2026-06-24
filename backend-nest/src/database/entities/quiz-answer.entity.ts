import {
  Entity, PrimaryGeneratedColumn, Column,
  Index, UpdateDateColumn,
} from 'typeorm';

// This Enum tracks the "state" of a question from the student's perspective.
// This is used to color the "Question Palette" (the grid of numbers) on the frontend.
export enum AnswerStatus {
  NOT_VISITED      = 'not_visited',      // Student hasn't opened this question yet (Grey)
  NOT_ANSWERED     = 'not_answered',     // Student opened it but left it blank (Red)
  ANSWERED         = 'answered',         // Student selected an option (Green)
  MARKED_FOR_REVIEW = 'marked_for_review', // Student wants to come back to this later (Purple)
}

@Entity('quiz_answers')
// CRITICAL INDEX: This ensures a student cannot have two different answers 
// for the same question in the same attempt.
@Index(['attemptId', 'questionId'], { unique: true })
// We index attemptId because we will constantly be fetching "All answers for Attempt X".
@Index(['attemptId'])
export class QuizAnswerEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Links to the QuizAttemptEntity.
  @Column({ name: 'attempt_id', type: 'uuid' })
  attemptId: string;

  // Links to the QuizQuestionEntity.
  @Column({ name: 'question_id', type: 'uuid' })
  questionId: string;

  // We store the order here so we can sort the answers without having to 
  // join the QuizQuestion table every single time.
  @Column({ name: 'question_order', type: 'int' })
  questionOrder: number;

  // 'jsonb' allows us to store different shapes of answers.
  // - For MCQ_SINGLE: stores "A"
  // - For MCQ_MULTI: stores ["A", "C"]
  // - For FILL_BLANK: stores "Mitochondria"
  @Column({ name: 'given_answer', type: 'jsonb', nullable: true })
  givenAnswer: string | string[] | null;

  @Column({ name: 'answer_status', length: 30, default: AnswerStatus.NOT_VISITED })
  answerStatus: AnswerStatus;

  // This is NULL until the quiz is submitted. 
  // Once the scoring service runs, it fills this with the actual points earned.
  @Column({ name: 'marks_obtained', type: 'numeric', precision: 5, scale: 2, nullable: true })
  marksObtained: number | null;

  @Column({ name: 'saved_at', type: 'timestamptz', nullable: true })
  savedAt: Date | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}