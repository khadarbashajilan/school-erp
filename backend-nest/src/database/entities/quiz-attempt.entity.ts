import {
  Entity, PrimaryGeneratedColumn, Column,
  Index, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

export enum AttemptStatus {
  JOINED         = 'joined',         // In the waiting room, hasn't started yet
  IN_PROGRESS    = 'in_progress',    // Timer is running, answering questions
  SUBMITTED      = 'submitted',      // Manually clicked the submit button
  AUTO_SUBMITTED = 'auto_submitted', // Server cron forced submit because time ran out
  MISSED         = 'missed',         // Joined the room but never actually started
}

// Tracks whether the student is allowed to see their score yet.
export enum ResultStatus {
  PENDING   = 'pending',   // Scoring is done, but it's hidden from the student
  PUBLISHED = 'published', // The release time has passed; student can now view result
}

@Entity('quiz_attempts')
// CRITICAL INDEX: This unique index prevents a student from taking the same quiz twice.
// If they try to join again, TypeORM will throw a 'Duplicate Entry' error.
@Index(['quizId', 'studentId'], { unique: true })
@Index(['quizId', 'attemptStatus'])
export class QuizAttemptEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_id', type: 'uuid' })
  quizId: string;

  @Column({ name: 'student_id', length: 50 })
  studentId: string;

  @Column({ name: 'student_name', length: 255 })
  studentName: string;

  @Column({ name: 'roll_number', length: 50, nullable: true })
  rollNumber: string | null;

  @Column({ name: 'class_id', length: 50 })
  classId: string;

  @Column({ name: 'section', length: 20 })
  section: string;

  @Column({ name: 'joined_at', type: 'timestamptz', nullable: true })
  joinedAt: Date | null;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt: Date | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt: Date | null;

  // We store remaining seconds so that if the student's internet drops 
  // and they refresh, we can resume the timer from where they left off.
  @Column({ name: 'remaining_seconds', type: 'int', nullable: true })
  remainingSeconds: number | null;

  @Column({ name: 'attempt_status', length: 30, default: AttemptStatus.JOINED })
  attemptStatus: AttemptStatus;

  @Column({ name: 'result_status', length: 30, default: ResultStatus.PENDING })
  resultStatus: ResultStatus;

  @Column({ name: 'score', type: 'numeric', precision: 6, scale: 2, nullable: true })
  score: number | null;

  @Column({ name: 'result_available_at', type: 'timestamptz', nullable: true })
  resultAvailableAt: Date | null;

  @Column({ name: 'school_id', length: 50, default: 'school_001' })
  schoolId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}