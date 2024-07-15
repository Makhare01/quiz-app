import { qk } from "@api/query-keys";
import { editQuiz, getQuizDetails } from "@api/quiz";
import { paths } from "@app/routes";
import { Loader } from "@app/ui/loader";
import { Typography } from "@mui/material";
import { QuizForm } from "@pages/create-quiz/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { match, P } from "ts-pattern";

export const EditQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams() as { quizId: string };

  const $quizDetails = useQuery({
    queryFn: () => getQuizDetails({ quizId }),
    queryKey: qk.quiz.details.toKeyWithArgs({ quizId }),
  });

  const $editQuiz = useMutation({
    mutationFn: editQuiz,
  });

  return match($quizDetails)
    .with({ isLoading: true }, () => <Loader centered />)
    .with({ isError: true, error: P.select() }, (error) => (
      <Typography>{error.message}</Typography>
    ))
    .with({ isSuccess: true, data: P.select() }, (quiz) => {
      return (
        <QuizForm
          defaultValues={{
            name: quiz.name,
            description: quiz.description,
            visibility: quiz.visibility,
            category: quiz.category,
          }}
          onSubmit={(values) => {
            $editQuiz.mutate(
              { quizId: quiz._id, ...values },
              {
                onSuccess: (quiz) => {
                  navigate(
                    generatePath(paths.addQuizQuestions, {
                      quizId: quiz._id,
                      questionsId: quiz.questionsId,
                    })
                  );
                },
              }
            );
          }}
          onBack={() =>
            navigate(
              generatePath(paths.myQuizDetails, {
                quizId: quiz._id,
              })
            )
          }
          submitText="Edit"
        />
      );
    })
    .run();
};
