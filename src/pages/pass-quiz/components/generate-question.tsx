import { PublicQuestion } from "@api/answer";
import { Checkbox } from "@app/ui/checkbox";
import { DatePicker } from "@app/ui/date-picker";
import { Radio } from "@app/ui/radio";
import { Select } from "@app/ui/select";
import { TextField } from "@app/ui/texfield";
import { getFieldError } from "@lib/form";
import { Box, RadioGroup, Typography } from "@mui/material";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import { QuestionAnswerFormValues } from "./current-question";

type Props = {
  question: PublicQuestion;
  control: Control<QuestionAnswerFormValues>;
  answers: Array<string>;
  setValue: UseFormSetValue<QuestionAnswerFormValues>;
};

export const GenerateQuestion = ({
  question: { type, isRequired, options, dropdownOptions },
  control,
  answers,
  setValue,
}: Props) => {
  const questionInput = (() => {
    switch (type) {
      case "TEXT":
        return (
          <Controller
            control={control}
            name="answers.0"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                {...getFieldError(error)}
                placeholder="Answer"
                label="Answer"
                required={isRequired}
              />
            )}
          />
        );
      case "TEXT_MULTILINE":
        return (
          <Controller
            control={control}
            name="answers.0"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                {...getFieldError(error)}
                placeholder="Answer"
                label="Answer"
                multiline
                rows={3}
                required={isRequired}
              />
            )}
          />
        );
      case "DATE":
        return (
          <Controller
            control={control}
            name="answers.0"
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                {...field}
                value={new Date(field.value)}
                onChange={(value) => {
                  field.onChange(value?.toString());
                }}
                label="Answer"
                required={isRequired}
                {...getFieldError(error)}
                sx={{
                  bgcolor: "white",
                }}
              />
            )}
          />
        );
      case "RADIO":
        return (
          <Controller
            control={control}
            name="answers.0"
            render={({ field }) => (
              <RadioGroup
                {...field}
                sx={{ display: "flex", flexDirection: "column", gap: 2, p: 0 }}
              >
                {options.map((option, index) => (
                  <Radio
                    key={option + index}
                    label={
                      <Typography variant="body1" fontWeight={700}>
                        {option}
                      </Typography>
                    }
                    value={option}
                  />
                ))}
              </RadioGroup>
            )}
          />
        );
      case "CHECKBOX":
        return (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            {options.map((option, index) => (
              <Checkbox
                key={option + index}
                label={
                  <Typography variant="body1" fontWeight={700}>
                    {option}
                  </Typography>
                }
                checked={answers.includes(option)}
                onChange={(event) => {
                  const checked = event.target.checked;

                  if (checked) {
                    setValue("answers", [...answers, option]);
                  } else {
                    const filteredAnswers = answers.filter(
                      (item) => item !== option
                    );
                    setValue("answers", filteredAnswers);
                  }
                }}
              />
            ))}
          </Box>
        );
      case "DROPDOWN":
        return (
          <Controller
            control={control}
            name="answers.0"
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                {...getFieldError(error)}
                fullWidth
                label="Answer"
                options={dropdownOptions}
              />
            )}
          />
        );
    }
  })();

  return questionInput;
};
