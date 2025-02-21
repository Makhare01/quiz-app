import { qk } from "@api/query-keys";
import { getPublicQuizDetails } from "@api/quiz";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { quizCategoryOptions } from "@utils/quizzes";
import { useParams } from "react-router-dom";
import { match, P } from "ts-pattern";
import { StartLinkedQuizForm } from "./components";

export const LinkedQuizPage = () => {
  const { quizId } = useParams() as {
    quizId: string;
  };

  const $publicQuizDetails = useQuery({
    queryFn: () => getPublicQuizDetails({ quizId }),
    queryKey: qk.quiz.publicQuizDetails.toKeyWithArgs({ quizId }),
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

              <StartLinkedQuizForm quiz={quiz} />
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
