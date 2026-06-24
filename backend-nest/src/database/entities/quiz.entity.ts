import {
  Entity,             // Marks this class as a database table
  PrimaryGeneratedColumn, // Creates a primary key that is auto-generated
  Column,             // Maps a class property to a database column
  CreateDateColumn,   // Automatically sets the date when a row is first created
  UpdateDateColumn,   // Automatically updates the date whenever the row is changed
  Index,              // Creates a database index to make searching/filtering much faster
} from 'typeorm';


export enum QuizStatus {
  DRAFT      = 'draft',
  SCHEDULED  = 'scheduled',
  JOIN_OPEN  = 'join_open',   
  LIVE       = 'live',        
  COMPLETED  = 'completed',   
  CANCELLED  = 'cancelled',   
}

// @Entity('quizzes') tells TypeORM to create a table in PostgreSQL named 'quizzes'.
@Entity('quizzes')
// These Indexes are critical. They tell the DB to optimize searches for these specific combinations.
// Example: When a teacher views "My Live Quizzes", the DB uses the first index.
@Index(['teacherId', 'status'])
@Index(['classId', 'section', 'status'])
export class QuizEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', length: 255 })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string | null;

  // 'type: date' stores only the date (YYYY-MM-DD) without the time.
  @Column({ name: 'scheduled_date', type: 'date' })
  scheduledDate: string;

  // 'type: time' stores only the time (HH:MM:SS).
  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'duration_minutes', type: 'int' })
  durationMinutes: number;

  // 'timestamptz' stands for "Timestamp with Time Zone". 
  // Always use this for dates/times to avoid timezone bugs between server and user.
  @Column({ name: 'scheduled_at', type: 'timestamptz', nullable: true })
  scheduledAt: Date | null;

  @Column({ name: 'join_open_at', type: 'timestamptz', nullable: true })
  joinOpenAt: Date | null;

  @Column({ name: 'late_start_minutes', type: 'int', default: 10 })
  lateStartMinutes: number;

  @Column({ name: 'result_release_hours', type: 'int', default: 24 })
  resultReleaseHours: number;

  @Column({ name: 'class_id', length: 50 })
  classId: string;

  @Column({ name: 'class_name', length: 100 })
  className: string;

  @Column({ name: 'section', length: 20 })
  section: string;

  @Column({ name: 'subject_id', length: 50 })
  subjectId: string;

  @Column({ name: 'subject_name', length: 100 })
  subjectName: string;

  @Column({ name: 'teacher_id', length: 50 })
  teacherId: string;

  @Column({ name: 'teacher_name', length: 255 })
  teacherName: string;

  // 'denormalised' columns store a calculated value to avoid expensive 'COUNT' queries 
  // every time the dashboard loads. We update these whenever a question is added/deleted.
  @Column({ name: 'total_questions', type: 'int', default: 0 })
  totalQuestions: number;

  // 'precision: 6, scale: 2' means the number can have 6 digits total, 2 after the decimal (e.g. 9999.99)
  @Column({ name: 'total_marks', type: 'numeric', precision: 6, scale: 2, default: 0 })
  totalMarks: number;

  @Column({ name: 'status', length: 30, default: QuizStatus.DRAFT })
  status: QuizStatus;

  @Column({ name: 'published_at', type: 'timestamptz', nullable: true })
  publishedAt: Date | null;

  @Column({ name: 'cancelled_at', type: 'timestamptz', nullable: true })
  cancelledAt: Date | null;

  @Column({ name: 'cancellation_reason', type: 'text', nullable: true })
  cancellationReason: string | null;

  @Column({ name: 'allow_review_before_submit', type: 'boolean', default: true })
  allowReviewBeforeSubmit: boolean;

  @Column({ name: 'show_answer_after_result', type: 'boolean', default: false })
  showAnswerAfterResult: boolean;

  @Column({ name: 'school_id', length: 50, default: 'school_001' })
  schoolId: string;

  // @CreateDateColumn automatically sets the time when the record is first inserted.
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // @UpdateDateColumn automatically updates every time you call .save() on this entity.
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}