import { Box, Typography } from "@mui/material";
import { OwnQuizzes } from "./components";

export const MyQuizzes = () => {
  return (
    <Box width={1} height={1} px={3}>
      <OwnQuizzes />

      <Box px={3} py={1} borderBottom={1} borderColor="divider" my={5}>
        <Typography variant="h3">Quizzes in progress</Typography>
      </Box>

      <Box px={3} py={1} borderBottom={1} borderColor="divider" mb={5}>
        <Typography variant="h3">Favorite Quizzes</Typography>
      </Box>
    </Box>
  );
};
