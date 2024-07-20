import { getUserAnswers } from "@api/answer";
import { qk } from "@api/query-keys";
import { getPublicQuizDetails } from "@api/quiz";
import { useAuthUser } from "@app/auth";
import { paths } from "@app/routes";
import { BackCloseButton } from "@components/back-close-button";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  generatePath,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { match, P } from "ts-pattern";
import { CurrentQuestion, PassedQuizView } from "./components";

export const PassQuizPage = () => {
  const authUser = useAuthUser();
  const [searchParams] = useSearchParams();

  const guestUserEmail = searchParams.get("email");

  const navigate = useNavigate();
  const { quizId, answerId } = useParams() as {
    quizId: string;
    answerId: string;
  };

  const $publicQuizDetails = useQuery({
    queryFn: () =>
      getPublicQuizDetails({ quizId, userId: authUser?.user.userId }),
    queryKey: qk.quiz.publicQuizDetails.toKeyWithArgs({
      quizId,
      userId: authUser?.user.userId,
    }),
  });

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
    <Box width={1} height={1} display="flex" flexDirection="column">
      {match($publicQuizDetails)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (quiz) => {
          return (
            <Box display="flex" alignItems="center" p={3} gap={2}>
              <Typography
                variant="h3"
                width={130}
                fontWeight={700}
                whiteSpace="nowrap"
              >
                Questions: {quiz.questionsCount}
              </Typography>
              <Box width={1}>
                <Typography variant="h2" fontWeight={700} textAlign="center">
                  {quiz.name}
                </Typography>
              </Box>
              <Box width={130} display="flex" justifyContent="flex-end">
                <BackCloseButton
                  onClick={() =>
                    navigate(
                      generatePath(paths.startQuiz, {
                        quizId: quiz.quizId,
                      })
                    )
                  }
                />
              </Box>
            </Box>
          );
        })
        .run()}

      {match($userAnswers)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (answer) => {
          const lastAnswerIndex = answer.answers.length - 1;
          const lastAnswer = answer.answers[lastAnswerIndex];

          const isFinished = answer.questionsCount === answer.answers.length;

          if (isFinished) {
            return <PassedQuizView userEmail={answer.user.email} />;
          }

          return (
            <CurrentQuestion
              questionsId={answer.questionsId}
              lastQuestionId={lastAnswer?.questionId}
              progress={{
                current: lastAnswerIndex + 2,
                total: answer.questionsCount ?? 0,
              }}
              answerId={answer._id}
              isLast={answer.questionsCount === answer.answers.length + 1}
              quizId={quizId}
              email={answer.user.email}
            />
          );
        })
        .run()}
    </Box>
  );
};
