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
  answerId: string;
};

export const getUserAnswers = async ({ answerId }: GetUserAnswerInput) => {
  return await request("/api/answer/:answerId").get(
    {
      params: {
        answerId,
      },
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
  answerType: AnswerTypes;
  answers: Array<string>;
  questionId: string;
  order: number;
};

export const saveAnswer = async ({
  answerId,
  answerType,
  answers,
  questionId,
  order,
}: SaveAnswerInput) => {
  return await request("/api/answer/:answerId/save").post({
    body: {
      answerType,
      answers,
      questionId,
      order,
    },
    params: {
      answerId,
    },
  });
};
