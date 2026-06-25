import {
  Entity, PrimaryGeneratedColumn, Column,
  Index, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

export enum AttemptStatus {
  IN_PROGRESS = 'in_progress',
  SUBMITTED   = 'submitted',
}

@Entity('quiz_attempts')
@Index(['quizId', 'studentId'], { unique: true })
@Index(['quizId', 'status'])
export class QuizAttemptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_id', type: 'uuid' })
  quizId: string;

  @Column({ name: 'student_id' })
  studentId: string;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt: Date | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt: Date | null;

  @Column({ name: 'score', type: 'numeric', precision: 6, scale: 2, nullable: true })
  score: number | null;

  @Column({ name: 'status', length: 20, default: AttemptStatus.IN_PROGRESS })
  status: AttemptStatus;

  @Column({ name: 'school_id', default: 'school_001' })
  schoolId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}