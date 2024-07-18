import { startQuiz } from "@api/answer";
import { qk } from "@api/query-keys";
import { getPublicQuizDetails } from "@api/quiz";
import { useAuthUser } from "@app/auth";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { BackCloseButton } from "@components/back-close-button";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { quizCategoryOptions } from "@utils/quizzes";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { match, P } from "ts-pattern";

export const StartQuizPage = () => {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  const { quizId } = useParams() as { quizId: string };

  const $publicQuizDetails = useQuery({
    queryFn: () => getPublicQuizDetails({ quizId }),
    queryKey: qk.quiz.publicQuizDetails.toKeyWithArgs({ quizId }),
  });

  const $startQuiz = useMutation({
    mutationFn: startQuiz,
  });

  return (
    <Box width={1} height={1} p={3} display="flex" flexDirection="column">
      {match($publicQuizDetails)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (quiz) => {
          const { Icon, label, color } = quizCategoryOptions[quiz.category];
          return (
            <Box display="flex" flexDirection="column" flex={1}>
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="space-between"
                gap={2}
              >
                <Box>
                  <Typography variant="h1" fontWeight={700}>
                    {quiz.name}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.disabled"
                    fontWeight={700}
                  >
                    {quiz.description}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <Typography variant="h3">Category: </Typography>
                    <Icon sx={{ color, fontSize: 28 }} />
                    <Typography variant="h3">{label}</Typography>
                  </Box>

                  <Typography variant="h3" mt={1}>
                    Questions:{" "}
                    <Typography variant="h3" component="span" fontWeight={700}>
                      {quiz.questionsCount}
                    </Typography>
                  </Typography>
                </Box>
                <BackCloseButton onClick={() => navigate(-1)} />
              </Box>

              <Box
                flex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  variant="outlined"
                  sx={{ width: 300, height: 70 }}
                  onClick={() => {
                    if (authUser) {
                      const { user } = authUser;
                      $startQuiz.mutate(
                        {
                          quizId: quiz.quizId,
                          userId: user.userId,
                          questionsId: quiz.questionsId,
                          email: user.email,
                          username: `${user.firstName} ${user.lastName}`,
                        },
                        {
                          onSuccess: (answer) => {
                            navigate(
                              generatePath(paths.passQuiz, {
                                quizId: quiz.quizId,
                                answerId: answer.answerId,
                              })
                            );
                          },
                        }
                      );
                    }
                  }}
                  disabled={$startQuiz.isPending}
                  isLoading={$startQuiz.isPending}
                >
                  START
                </Button>
              </Box>
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
