import { qk } from "@api/query-keys";
import { getQuizDetails } from "@api/quiz";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { CopyText } from "@app/ui/copy-text";
import { StarButton } from "@components/quiz-card/star-button";
import { QuizDetailsSkeleton } from "@components/skeletons";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { match, P } from "ts-pattern";
import { DeleteQuizButton, DetailsTabs, QuizStatusButton } from "../components";

export const MyQuizDetailsPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams() as { quizId: string };

  const $quizDetails = useQuery({
    queryFn: () => getQuizDetails({ quizId }),
    queryKey: qk.quiz.details.toKeyWithArgs({ quizId }),
  });

  return (
    <Box width={1} height={1} p={3} maxHeight={1}>
      {match($quizDetails)
        .with({ isLoading: true }, () => <QuizDetailsSkeleton />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (quiz) => {
          return (
            <Box sx={{ flex: 1, maxHeight: 1, overflow: "auto" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "flex-start",
                  justifyContent: "stretch",
                  gap: 3,
                  mb: 5,
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="h1" fontWeight={700}>
                      {quiz.name}
                    </Typography>

                    <StarButton
                      quizId={quiz._id}
                      isFavorite={quiz.isFavorite}
                      onUpdate={$quizDetails.refetch}
                      isBlocked
                    />

                    {quiz.visibility === "LINK" && (
                      <CopyText
                        text={`${location.host}${generatePath(
                          paths.linkedQuiz,
                          {
                            quizId: quiz._id,
                          }
                        )}`}
                        copyText="Copy quiz link"
                      />
                    )}
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.disabled"
                    fontWeight={700}
                  >
                    {quiz.description}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                    gap: 2,
                    flex: 1,
                    width: 1,
                  }}
                >
                  <QuizStatusButton
                    quizId={quiz._id}
                    status={quiz.status}
                    onChange={$quizDetails.refetch}
                    enabled={quiz.questionsCount > 0}
                  />
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => {
                      navigate(
                        generatePath(paths.addQuizQuestions, {
                          quizId: quiz._id,
                          questionsId: quiz.questionsId,
                        })
                      );
                    }}
                    sx={{
                      whiteSpace: "nowrap",
                      width: { xs: 1, sm: "auto" },
                    }}
                  >
                    {quiz.questionsCount > 0
                      ? "Edit questions"
                      : "Add questions"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate(
                        generatePath(paths.editQuiz, {
                          quizId: quiz._id,
                        })
                      );
                    }}
                    sx={{ width: { xs: 1, sm: "auto" } }}
                  >
                    Edit
                  </Button>
                  <DeleteQuizButton quizId={quiz._id} quizName={quiz.name} />
                </Box>
              </Box>

              <DetailsTabs questionsId={quiz.questionsId} users={quiz.users} />
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
