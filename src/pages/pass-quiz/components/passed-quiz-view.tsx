import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { Box, Typography } from "@mui/material";
import { generatePath, useNavigate, useParams } from "react-router-dom";

export const PasswdQuizView = () => {
  const navigate = useNavigate();

  const { answerId } = useParams() as { answerId: string };

  return (
    <Box
      flex={1}
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Typography variant="h2" fontWeight={700} textAlign="center">
        You already have passed this quiz, <br /> please choose another quiz
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            navigate(paths.dashboard);
          }}
          sx={{
            height: 60,
          }}
        >
          Go to quizzes list
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate(
              generatePath(paths.quizResult, {
                answerId,
              })
            );
          }}
          sx={{
            height: 60,
          }}
        >
          Go to result page
        </Button>
      </Box>
    </Box>
  );
};
