import { qk } from "@api/query-keys";
import { getUserFavoriteQuizzes } from "@api/quiz";
import { PublicQuizCard } from "@components/quiz-card";
import { QuizzesListSkeleton } from "@components/skeletons";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { match, P } from "ts-pattern";

export const FavoriteQuizzes = () => {
  const $favoriteQuizzes = useQuery({
    queryKey: qk.quiz.favoriteQuizzes.toKey(),
    queryFn: getUserFavoriteQuizzes,
  });

  return (
    <Box my={5}>
      <Typography variant="h3" fontWeight={700} mb={2}>
        Favorite Quizzes
      </Typography>

      {match($favoriteQuizzes)
        .with({ isLoading: true }, () => <QuizzesListSkeleton />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (quizzes) => {
          return quizzes.length > 0 ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              {quizzes.map((quiz) => (
                <PublicQuizCard
                  key={quiz.quizId}
                  quiz={quiz}
                  onFavoriteChange={$favoriteQuizzes.refetch}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="h3" textAlign="center" mt={3}>
              There are no Favorite quizzes
            </Typography>
          );
        })
        .run()}
    </Box>
  );
};
