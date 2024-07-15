import { Question } from "@api/questions";
import { Box } from "@mui/material";

type Props = {
  question: Question;
};

export const QuestionListItem = ({ question }: Props) => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "white",
        display: "flex",
      }}
    >
      {question.question}
    </Box>
  );
};
