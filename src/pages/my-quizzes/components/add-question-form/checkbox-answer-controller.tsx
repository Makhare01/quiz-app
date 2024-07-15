import { IconClose } from "@app/assets/icons";
import { TextField } from "@app/ui/texfield";
import { getFieldError } from "@lib/form";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { AddQuestionsFormValues } from "./add-question-form";

type Props = {
  control: Control<AddQuestionsFormValues>;
  index: number;
};

export const CheckboxAnswerController = ({ control, index }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.answers`,
  });

  return (
    <Box>
      <Typography variant="body2" color="text.disabled" mb={2}>
        Please check correct answer(s)
      </Typography>

      <Stack spacing={1}>
        {fields.map((answerField, i) => {
          return (
            <Box
              key={answerField.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "stretch",
              }}
            >
              <Controller
                control={control}
                name={`questions.${index}.answers.${i}.isCorrect`}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value === true}
                    onChange={(event) => {
                      const value = event.target.checked;
                      field.onChange(value);
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name={`questions.${index}.answers.${i}.answer`}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    {...getFieldError(error)}
                    placeholder={`Answer ${i + 1}`}
                    sx={{
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
          );
        })}
      </Stack>

      <Button
        variant="outlined"
        color="success"
        fullWidth
        onClick={() => [
          append({
            answer: `Answer ${fields.length + 1}`,
            isCorrect: false,
          }),
        ]}
        sx={{ mt: 2 }}
      >
        Add
      </Button>
    </Box>
  );
};
