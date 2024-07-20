import { request } from "@lib/request";
import { QuizFormValues } from "@pages/create-quiz/components";
import {
  QuizStatus,
  TInProgressQuizzes,
  TPublicQuiz,
  TPublicQuizzes,
  TQuiz,
  TQuizzes,
} from "./quiz.schema";

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

type ChangeQuizStatusInput = {
  quizId: string;
  status: QuizStatus;
};

export const changeQuizStatus = async ({
  quizId,
  status,
}: ChangeQuizStatusInput) => {
  return await request("/api/my-quizzes/:quizId/change-status").put({
    params: {
      quizId,
    },
    body: {
      status,
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

export type GetPublicQuizzesInput = {
  category?: string;
  search?: string;
};

export const getPublicQuizzes = async ({
  category,
  search,
}: GetPublicQuizzesInput) => {
  const query = new URLSearchParams();

  if (category) {
    query.set("category", category);
  }

  if (search) {
    query.set("search", search);
  }

  return await request("/api/quizzes").get(
    {
      query,
    },
    TPublicQuizzes
  );
};

export type GetPublicQuizDetailsInput = {
  quizId: string;
  userId?: string;
};

export const getPublicQuizDetails = async ({
  quizId,
  userId,
}: GetPublicQuizDetailsInput) => {
  const query = new URLSearchParams();

  if (userId) {
    query.set("userId", userId);
  }

  return await request("/api/quizzes/:quizId").get(
    {
      params: {
        quizId,
      },
      query,
    },
    TPublicQuiz
  );
};

export const getMyQuizzes = async () => {
  return await request("/api/my-quizzes").get({}, TQuizzes);
};

export const getQuizzesInProgress = async () => {
  return await request("/api/my-quizzes/in-progress").get(
    {},
    TInProgressQuizzes
  );
};

export const getUserFavoriteQuizzes = async () => {
  return await request("/api/my-quizzes/favorites").get({}, TPublicQuizzes);
};
