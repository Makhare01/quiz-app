import { Box, Skeleton } from "@mui/material";

export const QuizDetailsSkeleton = () => {
  return (
    <Box>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="stretch"
        gap={3}
        mb={5}
      >
        <Box>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={150} />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          gap={2}
          flex={1}
        >
          <Skeleton variant="rounded" width={130} height={45} />
          <Skeleton variant="rounded" width={130} height={45} />
          <Skeleton variant="rounded" width={130} height={45} />
          <Skeleton variant="rounded" width={130} height={45} />
        </Box>
      </Box>

      <Box mt={3}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Skeleton variant="rounded" sx={{ width: "50%", height: 50 }} />
          <Skeleton variant="rounded" sx={{ width: "50%", height: 50 }} />
        </Box>
      </Box>

      <Skeleton variant="rounded" sx={{ width: 1, height: 300, mt: 3 }} />
    </Box>
  );
};
