import { Box, Skeleton } from "@mui/material";

export const MyQuizzesSkeleton = () => {
  return (
    <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={`my-quizzes-skeleton-${index}`}
          variant="rounded"
          width={250}
          height={300}
        />
      ))}
    </Box>
  );
};
