import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizResultService {
  async calculateScore(attemptId: string) {
    // This will be implemented in Step 4
    return { score: 0, total: 0 };
  }
}