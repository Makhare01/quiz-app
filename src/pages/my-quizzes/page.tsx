import { Box, Typography } from "@mui/material";

export const MyQuizzes = () => {
  return (
    <Box width={1} height={1}>
      <Box px={3} py={1} borderBottom={1} borderColor="divider" my={5}>
        <Typography variant="h3">Quizzes in progress</Typography>
      </Box>

      <Box px={3} py={1} borderBottom={1} borderColor="divider" mb={5}>
        <Typography variant="h3">Favorite Quizzes</Typography>
      </Box>
    </Box>
  );
};
