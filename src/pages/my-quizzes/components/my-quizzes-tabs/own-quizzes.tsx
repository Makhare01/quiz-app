import { qk } from "@api/query-keys";
import { getMyQuizzes } from "@api/quiz";
import { QuizCard } from "@components/quiz-card";
import { MyQuizzesSkeleton } from "@components/skeletons";
import { Box, Typography } from "@mui/material";
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
        .with({ isLoading: true }, () => <MyQuizzesSkeleton />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Box>{error.message}</Box>
        ))
        .with({ isSuccess: true, data: P.select() }, (quizzes) => {
          return (
            <Box display="flex" alignItems="stretch" gap={3} flexWrap="wrap">
              {quizzes.map((quiz) => (
                <QuizCard
                  key={quiz._id}
                  quiz={quiz}
                  onFavoriteChange={$myQuizzes.refetch}
                />
              ))}
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
