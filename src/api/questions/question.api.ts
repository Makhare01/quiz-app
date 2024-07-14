import { request } from "@lib/request";
import { Question, TQuizQuestion } from "./question.schema";

type UpdateQuestionsInput = {
  questions: Array<Question>;
  quizId: string;
  questionsId: string;
};

export const updateQuestions = async ({
  questions,
  quizId,
  questionsId,
}: UpdateQuestionsInput) => {
  return await request("/api/question/:quizId/:questionsId/update").patch(
    {
      body: { questions },
      params: {
        quizId,
        questionsId,
      },
    },
    TQuizQuestion
  );
};

export type GetQuizQuestionInput = {
  questionsId: string;
};

export const getQuizQuestion = async ({
  questionsId,
}: GetQuizQuestionInput) => {
  return await request("/api/question/:questionsId").get(
    {
      params: {
        questionsId,
      },
    },
    TQuizQuestion
  );
};
