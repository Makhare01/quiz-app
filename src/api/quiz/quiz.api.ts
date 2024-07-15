import { request } from "@lib/request";
import { QuizFormValues } from "@pages/create-quiz/components";
import { TQuiz, TQuizzes } from "./quiz.schema";

export const createQuiz = async (input: QuizFormValues) => {
  return await request("/api/quiz/create").post(
    {
      body: input,
    },
    TQuiz
  );
};

type EditQuizInput = QuizFormValues & {
  quizId: string;
};

export const editQuiz = async ({ quizId, ...input }: EditQuizInput) => {
  return await request("/api/my-quizzes/:quizId/edit").patch(
    {
      body: input,
      params: {
        quizId,
      },
    },
    TQuiz
  );
};

type DeleteQuizInput = {
  quizId: string;
};

export const deleteQuiz = async ({ quizId }: DeleteQuizInput) => {
  return await request("/api/my-quizzes/:quizId/delete").delete({
    params: {
      quizId,
    },
  });
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
