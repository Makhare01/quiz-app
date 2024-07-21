import { Box, Skeleton } from "@mui/material";

export const EditQuestionsSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: 1,
          maxWidth: 800,
        }}
      >
        <Skeleton variant="text" sx={{ width: 1 }} />
        <Skeleton variant="rounded" sx={{ width: 1, height: 250 }} />
        <Skeleton variant="text" sx={{ width: 1 }} />
        <Skeleton variant="rounded" sx={{ width: 1, height: 250 }} />

        <Skeleton variant="rounded" sx={{ width: 1, height: 50, mt: 3 }} />
      </Box>
    </Box>
  );
};
