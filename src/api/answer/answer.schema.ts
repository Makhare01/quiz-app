import { TAnswerTypes, TDropdownAnswerOption } from "@api/questions";
import { z } from "zod";

export const TAnswerId = z.object({
  answerId: z.string(),
});

export const TQuestionAnswer = z.object({
  answer: z.array(z.string()),
  isCorrect: z.boolean().optional(),
});

export type QuestionAnswer = z.infer<typeof TQuestionAnswer>;

const TAnswer = z.object({
  _id: z.string(),
  questionId: z.string(),
  question: z.string(),
  answerType: TAnswerTypes,
  order: z.number(),
  questionAnswer: TQuestionAnswer,
});

export const TUserAnswer = z.object({
  _id: z.string(),
  user: z.object({
    userId: z.string().optional(),
    username: z.string(),
    email: z.string(),
  }),
  questionsId: z.string(),
  answers: z.array(TAnswer),
  quizName: z.string(),
  // TODO
  quizCategory: z.string(),
  questionsCount: z.number(),
  quizEndDate: z.string().optional(),
});

export const TPublicQuestion = z.object({
  questionId: z.string(),
  question: z.string(),
  type: TAnswerTypes,
  isRequired: z.boolean().optional(),
  order: z.number(),
  options: z.array(z.string()),
  dropdownOptions: z.array(TDropdownAnswerOption),
});

export type PublicQuestion = z.infer<typeof TPublicQuestion>;
