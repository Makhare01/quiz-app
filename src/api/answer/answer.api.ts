import { AnswerTypes } from "@api/questions";
import { request } from "@lib/request";
import { TAnswerId, TPublicQuestion, TUserAnswer } from "./answer.schema";

type StartQuizInput = {
  questionsId: string;
  quizId: string;
  userId: string;
  email: string;
  username: string;
};

export const startQuiz = async ({
  questionsId,
  quizId,
  userId,
  email,
  username,
}: StartQuizInput) => {
  return await request("/api/answer/:questionsId/start").post(
    {
      params: {
        questionsId,
      },
      body: {
        quizId,
        userId,
        email,
        username,
      },
    },
    TAnswerId
  );
};

export type GetUserAnswerInput = {
  answerId?: string;
  answersUser?: {
    userId: string;
    questionsId: string;
  };
};

export const getUserAnswers = async ({
  answerId,
  answersUser,
}: GetUserAnswerInput) => {
  const query = new URLSearchParams();

  if (answerId) {
    query.set("answerId", answerId);
  }

  if (answersUser) {
    query.set("userId", answersUser.userId);
    query.set("questionsId", answersUser.questionsId);
  }

  return await request("/api/answer/details").get(
    {
      query,
    },
    TUserAnswer
  );
};

export type GetCurrentQuestionInput = {
  questionsId: string;
  lastQuestionId?: string;
};

export const getCurrentQuestion = async ({
  questionsId,
  lastQuestionId,
}: GetCurrentQuestionInput) => {
  const query = new URLSearchParams();

  if (lastQuestionId) {
    query.set("lastQuestionId", lastQuestionId);
  }

  return await request("/api/answer/:questionsId/next").get(
    {
      params: {
        questionsId,
      },
      query,
    },
    TPublicQuestion
  );
};

type SaveAnswerInput = {
  answerId: string;
  questionId: string;
  quizId: string;
  answerType: AnswerTypes;
  answers: Array<string>;
  order: number;
  isLast: boolean;
};

export const saveAnswer = async ({
  answerId,
  questionId,
  quizId,
  answerType,
  answers,
  order,
  isLast,
}: SaveAnswerInput) => {
  return await request("/api/answer/:answerId/save").post({
    body: {
      questionId,
      quizId,
      answerType,
      answers,
      order,
      isLast,
    },
    params: {
      answerId,
    },
  });
};
