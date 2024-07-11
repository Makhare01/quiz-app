import { qk } from "@api/query-keys";
import { getQuizDetails } from "@api/quiz";
import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const MyQuizDetailsPage = () => {
  const { quizId } = useParams() as { quizId: string };

  const $quizDetails = useQuery({
    queryFn: () => getQuizDetails({ quizId }),
    queryKey: qk.quiz.details.toKey(),
  });

  return (
    <Box>
      <Typography>My quiz details page</Typography>
    </Box>
  );
};
