import { Box, Skeleton } from "@mui/material";

export const StartQuizSkeleton = () => {
  return (
    <Box display="flex" flexDirection="column" flex={1}>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        gap={2}
      >
        <Box>
          <Skeleton variant="text" width={150} />
          <Skeleton variant="text" width={100} />
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={150} />
        </Box>

        <Skeleton variant="circular" width={40} height={40} />
      </Box>

      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Skeleton variant="rounded" width={300} height={70} />
      </Box>
    </Box>
  );
};
