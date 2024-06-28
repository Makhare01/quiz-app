import { QuizCard } from "@components/quiz-card";
import { Box } from "@mui/material";

export const Dashboard = () => {
  return (
    <Box width={1} height={1} px={3} py={1}>
      <Box py={2} border={1} borderColor="divider" mb={1}>
        Filters
      </Box>
      <QuizCard />
    </Box>
  );
};
