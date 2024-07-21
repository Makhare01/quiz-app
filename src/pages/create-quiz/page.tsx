import { createQuiz } from "@api/quiz";
import { paths } from "@app/routes";
import { useMutation } from "@tanstack/react-query";
import { generatePath, useNavigate } from "react-router-dom";
import { QuizForm } from "./components";

export const CreateQuiz = () => {
  const navigate = useNavigate();

  const $createQuiz = useMutation({
    mutationFn: createQuiz,
  });

  return (
    <QuizForm
      defaultValues={{
        name: "",
        description: "",
        visibility: "PRIVATE",
        category: "OTHER",
      }}
      onSubmit={(values) => {
        $createQuiz.mutate(values, {
          onSuccess: (quiz) => {
            navigate(
              generatePath(paths.myQuizDetails, {
                quizId: quiz._id,
              })
            );
          },
        });
      }}
      onBack={() => navigate(paths.dashboard)}
    />
  );
};
