import { paths } from "@app/routes";
import { Button } from "@app/ui/button";
import { Box, Typography } from "@mui/material";
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useParams,
} from "react-router-dom";

type Props = {
  userEmail: string;
};

export const PassedQuizView = ({ userEmail }: Props) => {
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
            navigate({
              pathname: generatePath(paths.quizResult, {
                answerId,
              }),
              search: createSearchParams({
                email: userEmail,
              }).toString(),
            });
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
