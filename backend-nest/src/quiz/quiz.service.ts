import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizEntity, QuizStatus } from '../database/entities/quiz.entity';
import { QuizQuestionEntity, QuestionType } from '../database/entities/quiz-question.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private quizRepository: Repository<QuizEntity>,
    @InjectRepository(QuizQuestionEntity)
    private questionRepository: Repository<QuizQuestionEntity>,
  ) {}

  async createQuiz(dto: CreateQuizDto, user: any) {
    const scheduledAt = new Date(`${dto.scheduledDate}T${dto.startTime}:00`);

    const quiz = this.quizRepository.create({
      title: dto.title,
      scheduledAt,
      durationMinutes: dto.durationMinutes,
      classId: dto.classId,
      section: dto.section,
      subjectId: dto.subjectId,
      teacherId: user.teacherId,
      status: QuizStatus.DRAFT,
      schoolId: user.schoolId || 'school_001',
    });

    return this.quizRepository.save(quiz);
  }

  async getMyQuizzes(user: any) {
    return this.quizRepository.find({
      where: { teacherId: user.teacherId },
      order: { createdAt: 'DESC' },
    });
  }

  async getQuizById(id: string) {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz not found');

    const questions = await this.questionRepository.find({
      where: { quizId: id },
      order: { orderIndex: 'ASC' },
    });

    return { ...quiz, questions };
  }

  async publishQuiz(id: string) {
    const quiz = await this.quizRepository.findOne({ where: { id } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    if (quiz.status !== QuizStatus.DRAFT) {
      throw new BadRequestException('Only draft quizzes can be published');
    }

    quiz.status = QuizStatus.LIVE;
    return this.quizRepository.save(quiz);
  }

  async addQuestion(quizId: string, dto: CreateQuestionDto) {
    const quiz = await this.quizRepository.findOne({ where: { id: quizId } });
    if (!quiz) throw new NotFoundException('Quiz not found');
    if (quiz.status !== QuizStatus.DRAFT) {
      throw new BadRequestException('Can only add questions to draft quizzes');
    }

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
