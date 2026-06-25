import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, Index,
} from 'typeorm';

export enum QuizStatus {
  DRAFT     = 'draft',
  LIVE      = 'live',
  COMPLETED = 'completed',
}

@Entity('quizzes')
@Index(['teacherId', 'status'])
export class QuizEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'scheduled_at', type: 'timestamptz' })
  scheduledAt: Date;

  @Column({ name: 'duration_minutes', type: 'int' })
  durationMinutes: number;

  @Column({ name: 'class_id' })
  classId: string;

  @Column({ name: 'section' })
  section: string;

  @Column({ name: 'subject_id' })
  subjectId: string;

  @Column({ name: 'teacher_id' })
  teacherId: string;

  @Column({ name: 'status', default: QuizStatus.DRAFT })
  status: QuizStatus;

  @Column({ name: 'school_id', default: 'school_001' })
  schoolId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}