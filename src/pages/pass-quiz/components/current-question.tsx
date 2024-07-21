import { getCurrentQuestion, saveAnswer } from "@api/answer";
import { qk } from "@api/query-keys";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { LinearProgress } from "@app/ui/linear-progress";
import { PassQuizSkeleton } from "@components/skeletons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createSearchParams,
  generatePath,
  useNavigate,
} from "react-router-dom";
import { match, P } from "ts-pattern";
import { z } from "zod";
import { GenerateQuestion } from "./generate-question";

const QuestionAnswerFormSchema = z.object({
  answers: z.array(z.string()),
});

export type QuestionAnswerFormValues = z.infer<typeof QuestionAnswerFormSchema>;

type Props = {
  questionsId: string;
  lastQuestionId?: string;
  quizId: string;
  progress: {
    current: number;
    total: number;
  };
  answerId: string;
  isLast: boolean;
  email: string;
};

export const CurrentQuestion = ({
  questionsId,
  lastQuestionId,
  quizId,
  progress,
  answerId,
  isLast,
  email,
}: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { control, watch, setValue, reset, handleSubmit } =
    useForm<QuestionAnswerFormValues>({
      defaultValues: {
        answers: [],
      },
      resolver: zodResolver(QuestionAnswerFormSchema),
    });

  const answers = watch("answers").filter(
    (answer) => answer !== "" && answer !== undefined
  );

  const $currentQuestion = useQuery({
    queryKey: qk.answer.getCurrentQuestion.toKeyWithArgs({
      questionsId,
      lastQuestionId,
    }),
    queryFn: () => getCurrentQuestion({ questionsId, lastQuestionId }),
  });

  const $saveAnswer = useMutation({
    mutationFn: saveAnswer,
  });

  return (
    <Box flex={1}>
      {match($currentQuestion)
        .with({ isLoading: true }, () => <PassQuizSkeleton />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (question) => {
          return (
            <Box
              component="form"
              onSubmit={handleSubmit((values) => {
                $saveAnswer.mutate(
                  {
                    answerId,
                    quizId,
                    answers: values.answers.filter(
                      (answer) => answer !== "" && answer !== undefined
                    ),
                    answerType: question.type,
                    order: question.order,
                    questionId: question.questionId,
                    isLast,
                    userEmail: email,
                  },
                  {
                    onSuccess: () => {
                      reset();

                      if (isLast) {
                        navigate({
                          pathname: generatePath(paths.quizResult, {
                            answerId,
                          }),
                          search: createSearchParams({
                            email,
                          }).toString(),
                        });
                        return;
                      }
                      queryClient.invalidateQueries({
                        queryKey: qk.answer.getUserAnswer.toKeyWithArgs({
                          answerId,
                          email,
                        }),
                      });
                    },
                  }
                );
              })}
              sx={{
                height: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  lightingColor: "center",
                  justifyContent: "center",
                  py: 3,
                }}
              >
                <Box
                  width={1}
                  maxWidth={800}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography
                    variant="h1"
                    fontWeight={700}
                    textAlign="center"
                    color="text.secondary"
                    mb={3}
                  >
                    {question.question}
                  </Typography>

                  <Box
                    sx={{
                      width: "fit-content",
                      minWidth: { xs: 350, sm: 450 },
                    }}
                  >
                    <GenerateQuestion
                      key={question.questionId}
                      question={question}
                      control={control}
                      answers={answers}
                      setValue={setValue}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  bgcolor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  py: 4,
                }}
              >
                <Box
                  sx={{
                    width: 1,
                    maxWidth: 800,
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    gap: { xs: 2, md: 8 },
                  }}
                >
                  <LinearProgress
                    label={
                      <Typography>{`${progress.current}/${progress.total}`}</Typography>
                    }
                    value={(progress.current / progress.total) * 100}
                  />
                  <Button
                    color="success"
                    type="submit"
                    sx={{
                      width: { xs: 1, md: "auto" },
                      minWidth: 150,
                      color: "white",
                    }}
                    disabled={$saveAnswer.isPending}
                    isLoading={$saveAnswer.isPending}
                  >
                    {isLast ? "Finish" : "Next"}
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
