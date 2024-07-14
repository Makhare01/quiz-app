import { AnswerTypes } from "@api/questions";

export const quizQuestionTypesOptions: Record<AnswerTypes, string> = {
  TEXT: "Text",
  TEXT_MULTILINE: "Multiline text",
  RADIO: "Multiple choice",
  CHECKBOX: "Checkboxes",
  DROPDOWN: "Dropdown",
  DATE: "Date",
};
