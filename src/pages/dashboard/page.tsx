import { qk } from "@api/query-keys";
import { getPublicQuizzes } from "@api/quiz";
import { PublicQuizCard } from "@components/quiz-card";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { match, P } from "ts-pattern";

export const Dashboard = () => {
  const $publicQuizzes = useQuery({
    queryFn: getPublicQuizzes,
    queryKey: qk.quiz.publicQuizzes.toKey(),
  });

  return (
    <Box width={1} height={1} px={3} py={1}>
      <Box py={2} border={1} borderColor="divider" mb={3}>
        Filters
      </Box>
      {match($publicQuizzes)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Box>{error.message}</Box>
        ))
        .with({ isSuccess: true, data: P.select() }, (quizzes) => {
          return (
            <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
              {quizzes.map((quiz) => (
                <PublicQuizCard key={quiz.quizId} {...quiz} />
              ))}
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
