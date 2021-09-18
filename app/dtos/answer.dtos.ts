export interface QuestionDTO {
  questionId: string;
  questionContent: string;
  date: Date;
}

export interface SendAnswerRequest {
  userId: number;
  content: string;
}
