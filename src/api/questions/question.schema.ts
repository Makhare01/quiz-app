import { z } from "zod";

export const TAnswerTypes = z.union([
  z.literal("TEXT"),
  z.literal("TEXT_MULTILINE"),
  z.literal("RADIO"),
  z.literal("CHECKBOX"),
  z.literal("DROPDOWN"),
  z.literal("DATE"),
]);

export type AnswerTypes = z.infer<typeof TAnswerTypes>;

export const TDropdownAnswerOption = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export type DropdownAnswerOption = z.infer<typeof TDropdownAnswerOption>;

const TDropdownAnswers = z.object({
  answer: z.string(),
  options: z.array(TDropdownAnswerOption),
});

const TAnswer = z.object({
  answer: z.string().min(1),
  isCorrect: z.boolean(),
});

export const TQuestion = z.object({
  question: z.string().min(10),
  type: TAnswerTypes,
  isRequired: z.boolean().optional(),
  order: z.number(),
  answers: z.array(TAnswer).optional(),
  dropdownAnswers: TDropdownAnswers.optional(),
});

export type Question = z.infer<typeof TQuestion>;

export const TQuizQuestion = z.object({
  _id: z.string(),
  quizName: z.string(),
  questions: z.array(TQuestion),
});
