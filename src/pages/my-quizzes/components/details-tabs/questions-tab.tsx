import { qk } from "@api/query-keys";
import { getQuizQuestion } from "@api/questions";
import { Table } from "@app/ui/table";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { quizQuestionTypesOptions } from "@utils/questions";
import { match, P } from "ts-pattern";

type Props = {
  questionsId: string;
};

export const QuestionsTab = ({ questionsId }: Props) => {
  const $quizQuestion = useQuery({
    queryKey: qk.quiz.quizQuestion.toKeyWithArgs({ questionsId }),
    queryFn: () => getQuizQuestion({ questionsId }),
  });

  return (
    <Box>
      <Typography variant="body1" fontWeight={700} mb={3}>
        Questions list
      </Typography>

      {match($quizQuestion)
        .with({ isLoading: true }, () => <CircularProgress />)
        .with({ isError: true, error: P.select() }, (error) => (
          <Box>{error.message}</Box>
        ))
        .with({ isSuccess: true, data: P.select() }, (quizQuestion) => {
          return (
            <Table
              columns={[
                {
                  key: "question",
                  name: "Question",
                },
                {
                  key: "type",
                  name: "Type",
                },
                {
                  key: "is-required",
                  name: "Is required",
                },
              ]}
              rows={quizQuestion.questions.map((question, index) => {
                return {
                  key: question._id ?? index.toString(),
                  cells: [
                    question.question,
                    quizQuestionTypesOptions[question.type],
                    question.isRequired ? "Yes" : "No",
                  ],
                };
              })}
            />
          );
        })
        .run()}
    </Box>
  );
};
