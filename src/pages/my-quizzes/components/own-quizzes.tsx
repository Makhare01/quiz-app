import { qk } from "@api/query-keys";
import { getMyQuizzes } from "@api/quiz";
import { QuizCard } from "@components/quiz-card";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { match, P } from "ts-pattern";

export const OwnQuizzes = () => {
  const $myQuizzes = useQuery({
    queryFn: getMyQuizzes,
    queryKey: qk.quiz.myQuizzes.toKey(),
  });

  return (
    <Box my={5}>
      <Typography variant="h3" fontWeight={700} mb={2}>
        My Quizzes
      </Typography>

      {match($myQuizzes)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Box>{error.message}</Box>
        ))
        .with({ isSuccess: true, data: P.select() }, (quizzes) => {
          return (
            <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz._id} {...quiz} />
              ))}
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
