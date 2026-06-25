// Minimal DTO — the answer payload is flexible: "B", ["A","C"], null (to clear)
export class SaveAnswerDto {
  givenAnswer: string | string[] | null;
}