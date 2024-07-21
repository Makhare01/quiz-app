import { TQuizCategoryOptions, TVisibilityOptions } from "@api/quiz";
import { Button } from "@app/ui/button";
import { Dialog } from "@app/ui/dialog";
import { Select } from "@app/ui/select";
import { TextField } from "@app/ui/texfield";
import { BackCloseButton } from "@components/back-close-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "@lib/form";
import { Box, Typography } from "@mui/material";
import { recordToOptions } from "@utils/options";
import { quizCategoryOptions, quizVisibilityOptions } from "@utils/quizzes";
import { Controller, useForm } from "react-hook-form";
import { useBlocker } from "react-router-dom";
import { z } from "zod";

const QuizFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().max(500).optional(),
  visibility: TVisibilityOptions,
  category: TQuizCategoryOptions,
});

export type QuizFormValues = z.infer<typeof QuizFormSchema>;

type Props = {
  defaultValues: QuizFormValues;
  onSubmit: (values: QuizFormValues) => void;
  submitText?: string;
  onBack: () => void;
};

export const QuizForm = ({
  defaultValues,
  onSubmit,
  submitText,
  onBack,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<QuizFormValues>({
    defaultValues,
    resolver: zodResolver(QuizFormSchema),
  });

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty &&
      currentLocation.pathname !== nextLocation.pathname &&
      !nextLocation.pathname.includes("my-quizzes")
  );

  return (
    <Box
      component="form"
      width={1}
      height={1}
      px={3}
      py={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      onSubmit={handleSubmit((values) => {
        onSubmit(values);
      })}
    >
      <Box
        width={1}
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="flex-start">
          <Typography variant="h2" fontWeight={700} mr={1}>
            #
          </Typography>

          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                placeholder="Quiz name"
                sx={{
                  maxWidth: 300,
                  bgcolor: "transparent",
                  fontSize: 32,
                  borderRadius: 0,
                }}
                inputProps={{
                  style: {
                    fontSize: 26,
                    fontWeight: 700,
                    padding: 0,
                    paddingLeft: 0,
                  },
                }}
                {...getFieldError(error)}
              />
            )}
          />
        </Box>

        <BackCloseButton onClick={onBack} />
      </Box>

      <Box
        sx={{
          width: 1,
          maxWidth: { xs: 420, sm: 680 },
          mt: 5,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Controller
          control={control}
          name="visibility"
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              {...getFieldError(error)}
              fullWidth
              label="Visibility"
              options={recordToOptions(quizVisibilityOptions)}
            />
          )}
        />

        <Controller
          control={control}
          name="category"
          render={({ field, fieldState: { error } }) => (
            <Select
              {...field}
              {...getFieldError(error)}
              fullWidth
              label="Category"
              options={recordToOptions(quizCategoryOptions, "label")}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              {...getFieldError(error)}
              placeholder="Task description..."
              label="Description"
              multiline
              rows={5}
            />
          )}
        />
      </Box>

      <Button
        color="success"
        sx={{
          width: 300,
          color: "white",
          py: 3.5,
          position: "absolute",
          bottom: 20,
          ml: "auto",
          mr: "auto",
          left: 0,
          right: 0,
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          fontSize: 20,
          fontWeight: 600,
        }}
        type="submit"
      >
        {submitText ?? "Create"}
      </Button>

      <Dialog
        open={blocker.state === "blocked"}
        onClose={() => blocker.reset?.()}
        onConfirm={() => blocker.proceed?.()}
        title="Leave the page"
      >
        <Typography>
          Are you sure that you want to leave? If you leave you will lose all
          information you filled.
        </Typography>
      </Dialog>
    </Box>
  );
};
