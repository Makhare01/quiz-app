import { qk } from "@api/query-keys";
import { getQuizDetails } from "@api/quiz";
import { Button } from "@app/ui/button";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { match, P } from "ts-pattern";
import { DetailsTabs } from "../components";

export const MyQuizDetailsPage = () => {
  const { quizId } = useParams() as { quizId: string };

  const $quizDetails = useQuery({
    queryFn: () => getQuizDetails({ quizId }),
    queryKey: qk.quiz.details.toKey(),
  });

  return (
    <Box width={1} height={1} p={3}>
      {match($quizDetails)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (quiz) => {
          return (
            <Box>
              <Box
                display="flex"
                alignItems="flex-start"
                justifyContent="stretch"
                gap={3}
                mb={5}
              >
                <Box>
                  <Typography variant="h1" fontWeight={700}>
                    #{quiz.name}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.disabled"
                    fontWeight={700}
                  >
                    {quiz.description}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  gap={2}
                  flex={1}
                >
                  <Button variant="outlined">Edit</Button>
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </Box>
              </Box>

              <DetailsTabs />
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
