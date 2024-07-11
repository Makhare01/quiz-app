import { request } from "@lib/request";
import { CreateQuizFormValues } from "@pages/create-quiz/page";
import { TQuiz, TQuizzes } from "./quiz.schema";

export const createQuiz = async (input: CreateQuizFormValues) => {
  return await request("/api/quiz/create").post(
    {
      body: input,
    },
    TQuiz
  );
};

export type GetQuizDetailsInput = {
  quizId: string;
};

export const getQuizDetails = async ({ quizId }: GetQuizDetailsInput) => {
  return await request("/api/quiz/:quizId").get(
    {
      params: {
        quizId,
      },
    },
    TQuiz
  );
};

export const getPublicQuizzes = async () => {
  return await request("/api/quizzes").get({}, TQuizzes);
};

export const getMyQuizzes = async () => {
  return await request("/api/my-quizzes").get({}, TQuizzes);
};
