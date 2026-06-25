import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { QuizAttemptEntity } from './quiz-attempt.entity';
import { QuizQuestionEntity } from './quiz-question.entity';

@Entity('quiz_answers')
@Index(['attemptId', 'questionId'], { unique: true })
@Index(['attemptId'])
export class QuizAnswerEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @ManyToOne(() => QuizAttemptEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'attempt_id' })
  attempt: QuizAttemptEntity;

  @Column({ name: 'attempt_id', type: 'uuid' }) attemptId: string;

  @ManyToOne(() => QuizQuestionEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestionEntity;

  @Column({ name: 'question_id', type: 'uuid' }) questionId: string;

  @Column({ name: 'given_answer', type: 'jsonb', nullable: true })
  givenAnswer: string | string[] | null;

  @Column({ name: 'marks_obtained', type: 'numeric', precision: 5, scale: 2, nullable: true })
  marksObtained: number | null;

  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}