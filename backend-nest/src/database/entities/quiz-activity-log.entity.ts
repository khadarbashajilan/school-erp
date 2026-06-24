import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, Index,
} from 'typeorm';

// This entity is a "Log" or "Audit Trail". 
// Unlike other entities, we almost NEVER update or delete rows here.
// We only INSERT new rows. This ensures the history remains untampered.
@Entity('quiz_activity_logs')
// We index both IDs because we will often search for "Everything that happened 
// for Quiz X" or "Everything that happened for Student Attempt Y".
@Index(['quizId'])
@Index(['attemptId'])
export class QuizActivityLogEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Nullable because some events are general and not tied to a specific quiz.
  @Column({ name: 'quiz_id', type: 'uuid', nullable: true })
  quizId: string | null;

  // Nullable because some events (like 'quiz_published') are not tied to any student attempt.
  @Column({ name: 'attempt_id', type: 'uuid', nullable: true })
  attemptId: string | null;

  // The person (or system) who caused this event.
  @Column({ name: 'actor_id', length: 50 })
  actorId: string;

  // 'teacher', 'student', 'coordinator', or 'system' (for cron jobs).
  @Column({ name: 'actor_role', length: 30 })
  actorRole: string;

  // These event strings should be standardized in your service:
  // - quiz_created | quiz_published | quiz_cancelled
  // - attempt_joined | attempt_started | answer_saved | attempt_submitted
  // - attempt_auto_submitted | result_published
  @Column({ name: 'event', length: 60 })
  event: string;

  // 'jsonb' is used here to store flexible metadata.
  // Example for 'answer_saved' event: { "questionId": "uuid-1", "status": "answered" }
  // Example for 'quiz_cancelled' event: { "reason": "Technical glitch in classroom" }
  @Column({ name: 'meta', type: 'jsonb', nullable: true })
  meta: Record<string, unknown> | null;

  // The exact moment the event occurred.
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}