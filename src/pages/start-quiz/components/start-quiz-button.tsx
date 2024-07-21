import { getUserAnswers, startQuiz } from "@api/answer";
import { qk } from "@api/query-keys";
import { PublicQuiz } from "@api/quiz";
import { useAuthUser } from "@app/auth";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { Box } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generatePath, useNavigate } from "react-router-dom";

type Props = {
  quiz: PublicQuiz;
};

export const StartQuizButton = ({ quiz }: Props) => {
  const authUser = useAuthUser();

  const navigate = useNavigate();

  const $startQuiz = useMutation({
    mutationFn: startQuiz,
  });

  const args = {
    email: authUser?.user.email ?? "",
    questionsId: quiz.questionsId,
  };

  const { data: userAnswers, isLoading } = useQuery({
    queryKey: qk.answer.getUserAnswer.toKeyWithArgs(args),
    queryFn: () => getUserAnswers(args),
    meta: { disableError: true },
    enabled: authUser !== undefined,
  });

  const completedPercent =
    userAnswers &&
    Number(
      ((userAnswers.answers.length / userAnswers.questionsCount) * 100).toFixed(
        0
      )
    );

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
                quizId: quiz.quizId,
                questionsId: quiz.questionsId,
                userId: user.userId,
                email: user.email,
                username: `${user.firstName} ${user.lastName}`,
                quizName: quiz.name,
                category: quiz.category,
                questionsCount: quiz.questionsCount,
              },
              {
                onSuccess: (answer) => {
                  navigate(
                    generatePath(paths.passQuiz, {
                      quizId: quiz.quizId,
                      answerId: answer.answerId,
                    })
                  );
                },
              }
            );
          }
        }}
        disabled={$startQuiz.isPending || isLoading}
        isLoading={$startQuiz.isPending || isLoading}
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
