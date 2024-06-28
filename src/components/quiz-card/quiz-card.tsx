import { Box } from "@mui/material";

// type Props = {
//   title: string;
//   description: string;
//   questionsCount: number;
// };

export const QuizCard = () => {
  return (
    <Box
      sx={{
        width: 200,
        height: 255,
        bgcolor: "white",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        p: 1,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        display: "flex",
      }}
    >
      Card
    </Box>
  );
};
