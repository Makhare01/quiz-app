import { IconClose } from "@app/assets/icons";
import { TextField } from "@app/ui/texfield";
import { getFieldError } from "@lib/form";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  useFieldArray,
  UseFormSetValue,
} from "react-hook-form";
import { AddQuestionsFormValues } from "./add-question-form";

type Props = {
  control: Control<AddQuestionsFormValues>;
  index: number;
  setValue: UseFormSetValue<AddQuestionsFormValues>;
};

export const RadioAnswerController = ({ control, index, setValue }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
  });

  return (
    <Box>
      <Typography variant="body2" color="text.disabled" mb={2}>
        Please check correct answer
      </Typography>

      <RadioGroup
        name="radio-answer"
        defaultValue={0}
        onChange={(event) => {
          const value = Number(event.target.value);

          fields.forEach((_, fieldIndex) => {
            const key =
              `questions.${index}.answers.${fieldIndex}.isCorrect` as const;
            if (value === fieldIndex) setValue(key, true);
            else setValue(key, false);
          });
        }}
      >
        {fields.map((answerField, i) => {
          return (
            <FormControlLabel
              key={answerField.id}
              value={i}
              control={<Radio />}
              label={
                <Box width={1} display="flex" alignItems="center" gap={1}>
                  <Controller
                    control={control}
                    name={`questions.${index}.answers.${i}.answer`}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        {...getFieldError(error)}
                        placeholder={`Option ${i + 1}`}
                        sx={{
                          minWidth: 1,
                          borderBottom: 1,
                          borderColor: "divider",
                          borderRadius: 0,
                          flex: 1,
                        }}
                      />
                    )}
                  />
                  <IconButton
                    sx={{
                      ":hover .close-icon": {
                        color: "error.light",
                      },
                    }}
                    onClick={() => {
                      remove(i);
                    }}
                  >
                    <IconClose className="close-icon" />
                  </IconButton>
                </Box>
              }
              sx={{
                my: 1,
                "& .MuiFormControlLabel-label": {
                  width: 1,
                },
              }}
            />
          );
        })}
      </RadioGroup>
      <Button
        variant="outlined"
        color="success"
        fullWidth
        onClick={() => [
          append({
            answer: `Option ${fields.length + 1}`,
            isCorrect: false,
          }),
        ]}
      >
        Add
      </Button>
    </Box>
  );
};
