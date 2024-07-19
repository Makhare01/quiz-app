import { getUserAnswers, startQuiz } from "@api/answer";
import { qk } from "@api/query-keys";
import { useAuthUser } from "@app/auth";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generatePath, useNavigate } from "react-router-dom";

type Props = {
  quizId: string;
  questionsId: string;
};

export const StartQuizButton = ({ quizId, questionsId }: Props) => {
  const authUser = useAuthUser();

  const navigate = useNavigate();

  const $startQuiz = useMutation({
    mutationFn: startQuiz,
  });

  const args = {
    answersUser: {
      userId: authUser?.user.userId ?? "",
      questionsId,
    },
  };

  const { data: userAnswers } = useQuery({
    queryKey: qk.answer.getUserAnswer.toKeyWithArgs(args),
    queryFn: () => getUserAnswers(args),
    meta: { disableError: true },
    enabled: authUser !== undefined,
  });

  const completedPercent =
    userAnswers &&
    (userAnswers.answers.length / userAnswers.questionsCount) * 100;

  return (
    <Box flex={1} display="flex" alignItems="center" justifyContent="center">
      <Button
        variant="outlined"
        sx={{ width: 300, height: 70 }}
        onClick={() => {
          if (userAnswers && completedPercent === 100) {
            navigate(
              generatePath(paths.quizResult, {
                answerId: userAnswers._id,
              })
            );
            return;
          }

          if (authUser) {
            const { user } = authUser;
            $startQuiz.mutate(
              {
                quizId,
                userId: user.userId,
                questionsId,
                email: user.email,
                username: `${user.firstName} ${user.lastName}`,
              },
              {
                onSuccess: (answer) => {
                  navigate(
                    generatePath(paths.passQuiz, {
                      quizId,
                      answerId: answer.answerId,
                    })
                  );
                },
              }
            );
          }
        }}
        disabled={$startQuiz.isPending}
        isLoading={$startQuiz.isPending}
      >
        {completedPercent
          ? `${completedPercent}% ${
              completedPercent === 100 ? "See results" : "Continue"
            }`
          : "Start"}
      </Button>
    </Box>
  );
};
