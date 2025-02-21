import { InProgressQuiz, QuizCategoryOptions } from "@api/quiz";
import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { LinearProgress } from "@app/ui/linear-progress";
import { Box, Typography } from "@mui/material";
import { quizCategoryOptions } from "@utils/quizzes";
import { generatePath, useNavigate } from "react-router-dom";
import { StarButton } from "./star-button";

type Props = {
  quiz: InProgressQuiz;
  onFavoriteChange: () => void;
};

export const InProgressQuizCard = ({ quiz, onFavoriteChange }: Props) => {
  const navigate = useNavigate();

  const { label, Icon, color } =
    quizCategoryOptions[quiz.quizCategory as QuizCategoryOptions];

  const percent = ((quiz.answers.length / quiz.questionsCount) * 100).toFixed(
    0
  );

  const isFinished = Number(percent) == 100;

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "white",
        p: 2,
        border: 1,
        borderColor: color,
        borderRadius: 1,
        position: "relative",
      }}
    >
      <StarButton
        quizId={quiz.quizId}
        isFavorite={quiz.isFavorite}
        onUpdate={onFavoriteChange}
      />

      <Box display="flex" gap={1} alignItems="center" mb={2}>
        <Icon sx={{ color: color, fontSize: 32 }} />

        <Typography variant="h4">{label}</Typography>
      </Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        {quiz.quizName}
      </Typography>

      <Typography
        variant="h1"
        color="#848C97"
        fontSize={64}
        fontWeight={700}
        mt={3}
        mb={2}
      >
        {percent}%
      </Typography>
      <LinearProgress value={Number(percent)} />

      <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 4 }}
        onClick={() => {
          // In this case quiz._is is same as answerId
          if (isFinished) {
            navigate(
              generatePath(paths.quizResult, {
                answerId: quiz._id,
              })
            );

            return;
          }

          navigate(
            generatePath(paths.passQuiz, {
              quizId: quiz.quizId,
              answerId: quiz._id,
            })
          );
        }}
      >
        {isFinished ? "See results" : "Continue"}
      </Button>
    </Box>
  );
};
