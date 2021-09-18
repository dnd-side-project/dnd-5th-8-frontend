import axios from 'axios';
import { appConfigs } from '@/configs';
import { QuestionDTO, SendAnswerRequest } from '@/dtos';

export const getQuestionAsync = async (spaceId: number): Promise<QuestionDTO> => {
  const res = await axios.get<QuestionDTO>(`${appConfigs.baseUrl}/daily-questions/space/${spaceId}`);

  return res.data;
};

export const sendAnswerAsync = async (
  data: SendAnswerRequest,
  questionId: number,
  spaceId: number,
): Promise<QuestionDTO> => {
  const res = await axios.post<QuestionDTO>(
    `${appConfigs.baseUrl}/daily-questions/${questionId}/answer/space/${spaceId}`,
    data,
  );

  return res.data;
};
