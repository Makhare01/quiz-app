import { qk } from "@api/query-keys";
import { getQuizDetails } from "@api/quiz";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { match, P } from "ts-pattern";

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
          return <Typography variant="h1">{quiz.name}</Typography>;
        })
        .run()}
    </Box>
  );
};
