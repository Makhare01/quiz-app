import { startQuiz } from "@api/answer";
import { useAuthUser } from "@app/auth";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { TextField } from "@app/ui/texfield";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFieldError } from "@lib/form";
import { Box, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from "react-router-dom";
import { z } from "zod";

const TFormSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
});

type FormValues = z.infer<typeof TFormSchema>;

type Props = {
  quizId: string;
  questionsId: string;
};

export const StartLinkedQuizForm = ({ quizId, questionsId }: Props) => {
  const authUser = useAuthUser();

  const navigate = useNavigate();

  const { control, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      username: authUser
        ? `${authUser.user.firstName} ${authUser.user.lastName}`
        : "",
      email: authUser?.user.email ?? "",
    },
    resolver: zodResolver(TFormSchema),
  });

  const [username, email] = watch(["username", "email"]);

  const $startQuiz = useMutation({
    mutationFn: startQuiz,
  });

  return (
    <Box flex={1} display="flex" alignItems="center" justifyContent="center">
      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit((values) => {
          $startQuiz.mutate(
            {
              quizId,
              questionsId,
              email: values.email,
              username: values.username,
            },
            {
              onSuccess: (answer) => {
                navigate({
                  pathname: generatePath(paths.passQuiz, {
                    quizId,
                    answerId: answer.answerId,
                  }),
                  search: createSearchParams({
                    email: values.email,
                  }).toString(),
                });
              },
            }
          );
        })}
        width={400}
      >
        <Controller
          control={control}
          name="username"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="Username"
              {...getFieldError(error)}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              placeholder="Email"
              {...getFieldError(error)}
            />
          )}
        />

        <Button
          type="submit"
          variant="outlined"
          disabled={username === "" || email === ""}
        >
          Start
        </Button>
      </Stack>
    </Box>
  );
};
