import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity, QuizStatus } from '../database/entities/quiz.entity';
import { QuizQuestionEntity, QuestionType } from '../database/entities/quiz-question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

// @Injectable() marks this as a NestJS service — can be injected into controllers
@Injectable()
export class QuizService {
  // @InjectRepository gives us a TypeORM repository to query the DB
  constructor(
    @InjectRepository(QuizEntity)
    private quizRepository: Repository<QuizEntity>,
    @InjectRepository(QuizQuestionEntity)
    private questionRepository: Repository<QuizQuestionEntity>,
  ) {}

  // Teacher creates a draft quiz
  async createQuiz(dto: CreateQuizDto, user: any) {
    // Combine date + time strings from the DTO into a single Date object
    const scheduledAt = new Date(`${dto.scheduledDate}T${dto.startTime}:00`);

    // .create() builds an entity instance (does NOT save to DB yet)
    const quiz = this.quizRepository.create({
      title: dto.title,
      scheduledAt,
      durationMinutes: dto.durationMinutes,
      classId: dto.classId,
      section: dto.section,
      subjectId: dto.subjectId,
      teacherId: user.teacherId, // From JWT token via @CurrentUser()
      status: QuizStatus.DRAFT,
      schoolId: user.schoolId || 'school_001',
    });

    return this.quizRepository.save(quiz); // .save() actually INSERTs into DB
  }

  // List all quizzes created by the logged-in teacher
  async getMyQuizzes(user: any) {
    return this.quizRepository.find({
      where: { teacherId: user.teacherId },
      order: { createdAt: 'DESC' }, // newest first
    });
  }

  // Get a single quiz with its questions (teacher sees correct answers)
  async getQuizById(id: string) {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz not found');

    const questions = await this.questionRepository.find({
      where: { quizId: id },
      order: { orderIndex: 'ASC' },
    });

    return { ...quiz, questions };
  }

  // Change status from DRAFT → LIVE so students can see it
  async publishQuiz(id: string) {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    if (quiz.status !== QuizStatus.DRAFT) {
      throw new BadRequestException('Only draft quizzes can be published');
    }

    quiz.status = QuizStatus.LIVE;
    return this.quizRepository.save(quiz);
  }

  // Add a question to a draft quiz
  async addQuestion(quizId: string, dto: CreateQuestionDto) {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    if (quiz.status !== QuizStatus.DRAFT) {
      throw new BadRequestException('Can only add questions to draft quizzes');
    }

    // Auto-increment order — find the highest existing order, add 1
    const lastQuestion = await this.questionRepository.findOne({
      where: { quizId },
      order: { orderIndex: 'DESC' },
    });
    const nextOrder = lastQuestion ? lastQuestion.orderIndex + 1 : 1;

    const question = this.questionRepository.create({
      quizId,
      orderIndex: nextOrder,
      questionType: dto.questionType,
      questionText: dto.questionText,
      options: dto.options || null,
      correctAnswer: dto.correctAnswer,
      marks: dto.marks,
    });

    return this.questionRepository.save(question);
  }
}
