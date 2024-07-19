import { Quiz } from "@api/quiz";
import { paths } from "@app/routes";
import { Box, Stack, Typography } from "@mui/material";
import {
  quizCategoryOptions,
  quizStatusOptions,
  quizVisibilityOptions,
} from "@utils/quizzes";
import { format } from "date-fns";
import { generatePath, useNavigate } from "react-router-dom";
import { StarButton } from "./star-button";

const DetailsItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <Typography variant="body1" color="text.disabled">
      {label}:
      <Typography
        component="span"
        variant="body1"
        fontWeight={700}
        color="text.primary"
        ml={1}
      >
        {value}
      </Typography>
    </Typography>
  );
};

type Props = {
  quiz: Quiz;
  onFavoriteChange: () => void;
};

export const QuizCard = ({
  quiz: {
    _id: quizId,
    name,
    questionsCount,
    users,
    category,
    visibility,
    createdAt,
    status,
    isFavorite,
  },
  onFavoriteChange,
}: Props) => {
  const navigate = useNavigate();

  const { label, Icon, color } = quizCategoryOptions[category];

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "white",
        p: 2,
        border: 1,
        borderColor: color,
        borderRadius: 1,
        zIndex: 10,
        cursor: "pointer",
        position: "relative",
      }}
      onClick={() => {
        navigate(
          generatePath(paths.myQuizDetails, {
            quizId,
          })
        );
      }}
    >
      <StarButton
        quizId={quizId}
        isFavorite={isFavorite}
        onUpdate={onFavoriteChange}
      />

      <Box display="flex" gap={1} alignItems="center" mb={2}>
        <Icon sx={{ color: color, fontSize: 32 }} />

        <Typography variant="h4">{label}</Typography>
      </Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        {name}
      </Typography>

      <Stack spacing={1} mt={3}>
        <DetailsItem
          label="Visibility"
          value={quizVisibilityOptions[visibility]}
        />
        <DetailsItem label="Status" value={quizStatusOptions[status]} />
        <DetailsItem label="Questions" value={questionsCount} />
        <DetailsItem label="Users" value={users.length} />

        <DetailsItem
          label="Creation date"
          value={format(createdAt, "dd MMM yyyy")}
        />
      </Stack>
    </Box>
  );
};
