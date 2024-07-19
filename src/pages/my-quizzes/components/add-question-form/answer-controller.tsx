import { Question } from "@api/questions";
import { DatePicker } from "@app/ui/date-picker";
import { TextField } from "@app/ui/texfield";
import { getFieldError } from "@lib/form";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { AddQuestionsFormValues } from "./add-question-form";
import { CheckboxAnswerController } from "./checkbox-answer-controller";
import { DropdownAnswerController } from "./dropdown-answer-controller";
import { RadioAnswerController } from "./radio-answer-controller";

type Props = {
  control: Control<AddQuestionsFormValues>;
  currentQuestion: Question;
  index: number;
  setValue: UseFormSetValue<AddQuestionsFormValues>;
};

export const AnswerController = ({
  control,
  currentQuestion,
  index,
  setValue,
}: Props) => {
  const Input = (() => {
    switch (currentQuestion.type) {
      case "TEXT":
        return (
          <TextField
            placeholder="Answer"
            sx={{ width: 1, bgcolor: "background.default" }}
            disabled
          />
        );
      case "TEXT_MULTILINE":
        return (
          <TextField
            placeholder="Answer"
            sx={{ width: 1, bgcolor: "background.default" }}
            disabled
            multiline
            rows={3}
          />
        );
      case "DATE":
        return (
          <Controller
            control={control}
            name={`questions.${index}.answers.0.answer`}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                {...field}
                value={new Date(field.value)}
                onChange={(value) => {
                  field.onChange(value?.toString());
                  setValue(`questions.${index}.answers.0.isCorrect`, true);
                }}
                label="Answer"
                {...getFieldError(error)}
              />
            )}
          />
        );
      case "RADIO":
        return (
          <RadioAnswerController
            control={control}
            index={index}
            setValue={setValue}
          />
        );
      case "DROPDOWN":
        return <DropdownAnswerController control={control} index={index} />;
      case "CHECKBOX":
        return <CheckboxAnswerController control={control} index={index} />;
      default:
        return <DatePicker disabled label="Answer" />;
    }
  })();

  return Input;
};
