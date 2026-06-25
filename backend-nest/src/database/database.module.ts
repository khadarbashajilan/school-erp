import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { SubjectEntity } from './entities/subject.entity';
import { TeacherEntity } from './entities/teacher.entity';
import { SchoolClassEntity } from './entities/class.entity';
import { RoomEntity } from './entities/room.entity';
import { PeriodEntity } from './entities/period.entity';
import { TaskEntity } from './entities/task.entity';
import { TaskAssignmentEntity } from './entities/task-assignment.entity';
import { LeaveApplicationEntity } from './entities/leave-application.entity';
import { ProxyAssignmentEntity } from './entities/proxy-assignment.entity';
import { TimetableEntity } from './entities/timetable.entity';
import { TimetableSettingsEntity } from './entities/timetable-settings.entity';
import { AttendanceEntity } from './entities/attendance.entity';
import { FeeEntity } from './entities/fee.entity';
import { ReportEntity } from './entities/report.entity';
import { NotificationEntity } from './entities/notification.entity';
import { AcademicYearEntity } from './entities/academic-year.entity';
import { TeacherLeaveBalanceEntity } from './entities/teacher-leave-balance.entity';
import { FeedbackEntity } from './entities/feedback.entity';
import { StudentEntity } from './entities/student.entity';
import { CircularEntity } from './entities/circular.entity';
import { MailboxEntity } from './entities/mailbox.entity';
import { AchievementEntity } from './entities/achievement.entity';
import { MessageEntity } from './entities/message.entity';
import { HomeworkEntity } from './entities/homework.entity';
import { HomeworkAssignmentEntity } from './entities/homework-assignment.entity';
import { HomeworkSubmissionEntity } from './entities/homework-submission.entity';
import { TeachingAssignmentEntity } from './entities/teaching-assignment.entity';
import { QuizEntity } from './entities/quiz.entity';
import { QuizQuestionEntity } from './entities/quiz-question.entity';
import { QuizAttemptEntity } from './entities/quiz-attempt.entity';
import { QuizAnswerEntity } from './entities/quiz-answer.entity';
// import { QuizActivityLogEntity } from './entities/quiz-activity-log.entity';

const ALL_ENTITIES = [
  UserEntity,
  SubjectEntity,
  TeacherEntity,
  SchoolClassEntity,
  RoomEntity,
  PeriodEntity,
  TaskEntity,
  TaskAssignmentEntity,
  LeaveApplicationEntity,
  ProxyAssignmentEntity,
  TimetableEntity,
  TimetableSettingsEntity,
  AttendanceEntity,
  FeeEntity,
  ReportEntity,
  NotificationEntity,
  AcademicYearEntity,
  TeacherLeaveBalanceEntity,
  FeedbackEntity,
  StudentEntity,
  CircularEntity,
  MailboxEntity,
  AchievementEntity,
  MessageEntity,
  HomeworkEntity,
  HomeworkAssignmentEntity,
  HomeworkSubmissionEntity,
  TeachingAssignmentEntity,
  QuizEntity,
  QuizQuestionEntity,
  QuizAttemptEntity,
  QuizAnswerEntity,
  // QuizActivityLogEntity,
];
import { buildDataSourceOptions } from './typeorm-options';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        buildDataSourceOptions((key) => config.get<string>(key)),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
