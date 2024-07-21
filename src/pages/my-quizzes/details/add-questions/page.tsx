import { qk } from "@api/query-keys";
import { getQuizQuestion } from "@api/questions";
import { getQuizDetails } from "@api/quiz";
import { paths } from "@app/routes";
import { BackCloseButton } from "@components/back-close-button";
import { EditQuestionsSkeleton } from "@components/skeletons";
import { Box, Skeleton, Typography } from "@mui/material";
import { AddQuestionForm } from "@pages/my-quizzes/components";
import { useQuery } from "@tanstack/react-query";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { match, P } from "ts-pattern";

export const AddQuizQuestionsPage = () => {
  const navigate = useNavigate();

  const { quizId, questionsId } = useParams() as {
    quizId: string;
    questionsId: string;
  };

  const $quizQuestion = useQuery({
    queryKey: qk.quiz.quizQuestion.toKeyWithArgs({ questionsId }),
    queryFn: () => getQuizQuestion({ questionsId }),
  });

  const $quizDetails = useQuery({
    queryFn: () => getQuizDetails({ quizId }),
    queryKey: qk.quiz.details.toKeyWithArgs({ quizId }),
  });

  return (
    <Box width={1} height={1} p={3} display="flex" flexDirection="column">
      {match($quizDetails)
        .with({ isLoading: true }, () => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Skeleton variant="text" width={250} />
            <Skeleton variant="circular" width={40} height={40} />
          </Box>
        ))
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (quiz) => (
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography variant="h3" fontWeight={500}>
              Add questions to quiz:{" "}
              <Typography component="span" variant="h3" fontWeight={700}>
                {quiz.name}
              </Typography>
            </Typography>

            <BackCloseButton
              onClick={() =>
                navigate(
                  generatePath(paths.myQuizDetails, {
                    quizId: quiz._id,
                  })
                )
              }
            />
          </Box>
        ))
        .run()}

      {match($quizQuestion)
        .with({ isLoading: true }, () => <EditQuestionsSkeleton />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Typography>{error.message}</Typography>
        ))
        .with({ isSuccess: true, data: P.select() }, (quizQuestion) => (
          <AddQuestionForm
            quizId={quizId}
            questionsId={quizQuestion._id}
            defaultQuestions={quizQuestion.questions}
          />
        ))
        .run()}
    </Box>
  );
};
