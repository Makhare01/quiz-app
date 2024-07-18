import { DropdownAnswerOption, TDropdownAnswerOption } from "@api/questions";
import { IconClose } from "@app/assets/icons";
import { Button } from "@app/ui/button";
import { Select } from "@app/ui/select";
import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "@lib/form";
import { Box, IconButton, Typography } from "@mui/material";
import { Control, Controller, useFieldArray, useForm } from "react-hook-form";
import { AddQuestionsFormValues } from "./add-question-form";

type Props = {
  control: Control<AddQuestionsFormValues>;
  index: number;
};

export const DropdownAnswerController = ({ control, index }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.dropdownAnswers.options`,
  });

  const {
    control: optionsControl,
    handleSubmit,
    reset,
    setError,
  } = useForm<DropdownAnswerOption>({
    defaultValues: {
      label: "",
      value: "",
    },
    resolver: zodResolver(TDropdownAnswerOption),
  });

  return (
    <Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap={1}
      >
        <Controller
          control={optionsControl}
          name="label"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...getFieldError(error)}
              label="Option label"
              placeholder="label"
              sx={{ border: 1, borderColor: "divider" }}
            />
          )}
        />

        <Controller
          control={optionsControl}
          name="value"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...getFieldError(error)}
              label="Option value"
              placeholder="value"
              sx={{ border: 1, borderColor: "divider" }}
            />
          )}
        />

        <Button
          variant="outlined"
          color="success"
          onClick={handleSubmit((value) => {
            const isDuplicated = fields.some(
              (field) => field.value === value.value
            );

            if (isDuplicated) {
              return setError("value", {
                message: `Value "${value.value}" is duplicated, it must be unique for each option.`,
              });
            }

            append(value);
            reset();
          })}
        >
          Add
        </Button>
      </Box>

      {fields.length > 0 && (
        <>
          <Typography variant="body2" color="text.disabled" mb={1} mt={3}>
            Please select correct answer
          </Typography>

          <Controller
            control={control}
            name={`questions.${index}.dropdownAnswers.answer`}
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                {...getFieldError(error)}
                fullWidth
                label="Answer type"
                placeholder="Select option"
                options={fields}
                required
                sx={{ mb: 2, bgcolor: "background.default" }}
                itemAction={(id) => (
                  <IconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      remove(id);
                    }}
                  >
                    <IconClose />
                  </IconButton>
                )}
              />
            )}
          />
        </>
      )}
    </Box>
  );
};
