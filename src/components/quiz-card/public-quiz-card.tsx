import { PublicQuiz } from "@api/quiz";
import { paths } from "@app/routes";
import { Box, Typography } from "@mui/material";
import { quizCategoryOptions } from "@utils/quizzes";
import { generatePath, useNavigate } from "react-router-dom";
import { StarButton } from "./star-button";

type Props = {
  quiz: PublicQuiz;
  onFavoriteChange: () => void;
};

export const PublicQuizCard = ({ quiz, onFavoriteChange }: Props) => {
  const navigate = useNavigate();
  const { Icon, color } = quizCategoryOptions[quiz.category];

  return (
    <Box
      sx={{
        width: 250,
        height: 130,
        bgcolor: "white",
        p: 3,
        border: 1,
        borderColor: color,
        borderRadius: 1,
        zIndex: 10,
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(to left, white 50%, ${color} 50%) right`,
        backgroundSize: "200%",
        transition: ".5s ease-out",

        ":hover": {
          backgroundPosition: "left",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        },
      }}
      onClick={() => {
        navigate(
          generatePath(paths.startQuiz, {
            quizId: quiz.quizId,
          })
        );
      }}
    >
      <StarButton
        quizId={quiz.quizId}
        isFavorite={quiz.isFavorite}
        onUpdate={onFavoriteChange}
      />
      <Icon
        sx={{
          color: "divider",
          fontSize: 74,
          position: "absolute",
          right: 10,
          bottom: 0,
          opacity: 0.7,
        }}
      />

      <Typography variant="h3" fontWeight={700} textAlign="center">
        {quiz.name}
      </Typography>
    </Box>
  );
};
