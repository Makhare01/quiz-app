import { z } from "zod";

export const TVisibilityOptions = z.union([
  z.literal("PUBLIC"),
  z.literal("PRIVATE"),
  z.literal("LINK"),
]);

export type VisibilityOptions = z.infer<typeof TVisibilityOptions>;

export const TQuizCategoryOptions = z.union([
  z.literal("SCIENCE"),
  z.literal("HISTORY"),
  z.literal("GEOGRAPHY"),
  z.literal("LITERATURE"),
  z.literal("ENTERTAINMENT"),
  z.literal("SPORTS"),
  z.literal("TECHNOLOGY"),
  z.literal("ART"),
  z.literal("FOOD_AND_DRINK"),
  z.literal("HEALTH"),
  z.literal("LANGUAGES"),
  z.literal("BUSINESS"),
  z.literal("MYTHOLOGY"),
  z.literal("POP_CULTURE"),
  z.literal("NATURE"),
  z.literal("POLITICS"),
  z.literal("FASHION"),
  z.literal("TRAVEL"),
  z.literal("FUNNY"),
  z.literal("OTHER"),
]);

export type QuizCategoryOptions = z.infer<typeof TQuizCategoryOptions>;

const TQuizStatus = z.union([z.literal("IN_PROGRESS"), z.literal("READY")]);

export type QuizStatus = z.infer<typeof TQuizStatus>;

const TQuizUserAnswer = z.object({
  answerId: z.string(),
  score: z.string(),
});

const TQuizUser = z.object({
  userId: z.string(),
  email: z.string().email(),
  username: z.string(),
  answer: TQuizUserAnswer,
});

export type QuizUser = z.infer<typeof TQuizUser>;

export const TQuiz = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  visibility: TVisibilityOptions,
  category: TQuizCategoryOptions,
  questionsCount: z.number(),
  questionsId: z.string(),
  status: TQuizStatus,
  createdAt: z.string(),
  users: z.array(TQuizUser),
});

export type Quiz = z.infer<typeof TQuiz>;

export const TQuizzes = z.array(TQuiz);
