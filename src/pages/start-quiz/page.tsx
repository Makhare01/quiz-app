import { qk } from "@api/query-keys";
import { getPublicQuizDetails } from "@api/quiz";
import { useAuthUser } from "@app/auth";
import { BackCloseButton } from "@components/back-close-button";
import { StartQuizSkeleton } from "@components/skeletons";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { quizCategoryOptions } from "@utils/quizzes";
import { useNavigate, useParams } from "react-router-dom";
import { match, P } from "ts-pattern";
import { StartQuizButton } from "./components";

export const StartQuizPage = () => {
  const authUser = useAuthUser();

  const navigate = useNavigate();

  const { quizId } = useParams() as { quizId: string };

  const $publicQuizDetails = useQuery({
    queryFn: () =>
      getPublicQuizDetails({ quizId, userId: authUser?.user.userId }),
    queryKey: qk.quiz.publicQuizDetails.toKeyWithArgs({
      quizId,
      userId: authUser?.user.userId,
    }),
  });

  return (
    <Box width={1} height={1} p={3} display="flex" flexDirection="column">
      {match($publicQuizDetails)
        .with({ isLoading: true }, () => <StartQuizSkeleton />)
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

              <StartQuizButton quiz={quiz} />
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
