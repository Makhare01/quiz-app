import { qk } from "@api/query-keys";
import { getQuizzesInProgress } from "@api/quiz";
import { IconArrow } from "@app/assets/icons";
import { InProgressQuizCard } from "@components/quiz-card";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { match, P } from "ts-pattern";

const EmptyView = ({ message }: { message: string }) => {
  return (
    <Box sx={{ p: 3, bgcolor: "white", borderRadius: 2 }}>
      <Typography variant="h3" fontWeight={700} textAlign="center">
        {message}
      </Typography>
    </Box>
  );
};

export const QuizzesInProgress = () => {
  const $inProgressQuizzes = useQuery({
    queryKey: qk.quiz.inProgress.toKey(),
    queryFn: getQuizzesInProgress,
  });

  return (
    <Box my={5}>
      {match($inProgressQuizzes)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (quizzes) => {
          const inProgressQuizzes = quizzes.filter(
            (quiz) => quiz.answers.length < quiz.questionsCount
          );
          const finishedQuizzes = quizzes.filter(
            (quiz) => quiz.answers.length == quiz.questionsCount
          );

          return (
            <Box>
              <Accordion
                sx={{
                  bgcolor: "transparent",
                  boxShadow: "none",
                }}
                disableGutters
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={<IconArrow />}
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h3" fontWeight={700}>
                    In Progress
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 2 }}>
                  {inProgressQuizzes.length > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 3,
                        flexWrap: "wrap",
                      }}
                    >
                      {inProgressQuizzes.map((quiz) => {
                        return (
                          <InProgressQuizCard
                            key={quiz._id}
                            quiz={quiz}
                            onFavoriteChange={$inProgressQuizzes.refetch}
                          />
                        );
                      })}
                    </Box>
                  ) : (
                    <EmptyView message="There are no in progress quizzes" />
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion
                sx={{
                  bgcolor: "transparent",
                  boxShadow: "none",
                  mt: 3,
                  "&:before": {
                    display: "none",
                  },
                }}
                disableGutters
                defaultExpanded
              >
                <AccordionSummary
                  expandIcon={<IconArrow />}
                  sx={{
                    borderTop: 0,
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h3" fontWeight={700}>
                    Finished
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 2 }}>
                  {finishedQuizzes.length > 0 ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 3,
                        flexWrap: "wrap",
                      }}
                    >
                      {finishedQuizzes.map((quiz) => {
                        return (
                          <InProgressQuizCard
                            key={quiz._id}
                            quiz={quiz}
                            onFavoriteChange={$inProgressQuizzes.refetch}
                          />
                        );
                      })}
                    </Box>
                  ) : (
                    <EmptyView message="There are no finished quizzes" />
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
