import { getUserAnswers } from "@api/answer";
import { qk } from "@api/query-keys";
import { useAuthUser } from "@app/auth";
import { ResultPageSkeleton } from "@components/skeletons";
import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useParams, useSearchParams } from "react-router-dom";
import { match, P } from "ts-pattern";

export const ResultPage = () => {
  const authUser = useAuthUser();
  const [searchParams] = useSearchParams();

  const guestUserEmail = searchParams.get("email");

  const { answerId } = useParams() as {
    answerId: string;
  };

  const email = guestUserEmail ?? authUser?.user.email;

  const args = {
    answerId,
    email: email ?? "",
  };

  const $userAnswers = useQuery({
    queryKey: qk.answer.getUserAnswer.toKeyWithArgs(args),
    queryFn: () => getUserAnswers(args),
  });

  return (
    <Box width={1} height={1} p={3} display="flex" flexDirection="column">
      <Typography variant="h2" fontWeight={700} textAlign="center" mb={2}>
        Quiz result page
      </Typography>
      {match($userAnswers)
        .with({ isLoading: true }, () => <ResultPageSkeleton />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (userAnswers) => {
          return (
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
              }}
            >
              <Typography variant="h3" fontWeight={700} my={3}>
                User
              </Typography>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="body1">
                  Username:{" "}
                  <Typography component="span" variant="body1" fontWeight={600}>
                    {userAnswers.user.username}
                  </Typography>
                </Typography>
                <Typography variant="body1">
                  Email:{" "}
                  <Typography component="span" variant="body1" fontWeight={600}>
                    {userAnswers.user.email}
                  </Typography>
                </Typography>
                {userAnswers.quizEndDate && (
                  <Typography variant="body1">
                    Quiz end date:{" "}
                    <Typography
                      component="span"
                      variant="body1"
                      fontWeight={600}
                    >
                      {format(userAnswers.quizEndDate, "dd MMM yyyy")}
                    </Typography>
                  </Typography>
                )}
              </Box>

              <Typography variant="h3" fontWeight={700} my={3}>
                Answers
              </Typography>

              <Stack spacing={2} overflow="auto">
                {userAnswers.answers.map((userAnswer) => {
                  const answer = userAnswer.questionAnswer;

                  const borderColor =
                    answer.isCorrect === true ? "success.main" : "error.main";

                  return (
                    <Box
                      key={userAnswer._id}
                      sx={{
                        border: 1,
                        borderColor:
                          answer.isCorrect !== undefined
                            ? borderColor
                            : "divider",
                        borderRadius: 2,
                        p: 2,
                        bgcolor: "white",
                      }}
                    >
                      <Typography variant="h4" fontWeight={700} mb={1}>
                        #{userAnswer.question}
                      </Typography>
                      {userAnswer.answerType === "CHECKBOX" ? (
                        <Box>
                          <Typography>Submitted answers:</Typography>

                          {answer.answer.map((item) => (
                            <Typography ml={1} fontWeight={700}>
                              - {item}
                            </Typography>
                          ))}
                        </Box>
                      ) : (
                        <Typography>
                          Submitted answer:{" "}
                          <Typography component="span" fontWeight={700}>
                            {userAnswer.answerType === "DATE"
                              ? format(answer.answer[0], "dd MMM yyyy")
                              : answer.answer[0]}
                          </Typography>
                        </Typography>
                      )}

                      {answer.isCorrect !== undefined && (
                        <Typography mt={1}>
                          correct:{" "}
                          <Typography component="span" fontWeight={700}>
                            {answer.isCorrect === true ? "Yes" : "No"}
                          </Typography>
                        </Typography>
                      )}
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          );
        })
        .run()}
    </Box>
  );
};
