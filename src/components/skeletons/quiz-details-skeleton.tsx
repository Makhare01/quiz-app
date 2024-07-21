import { Box, Skeleton } from "@mui/material";

export const QuizDetailsSkeleton = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          justifyContent: "stretch",
          gap: 3,
          mb: 5,
        }}
      >
        <Box>
          <Skeleton variant="text" width={200} />
          <Skeleton variant="text" width={150} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            gap: 2,
            flex: 1,
            width: 1,
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{ width: { xs: 1, sm: 130 }, height: 45 }}
          />
          <Skeleton
            variant="rounded"
            sx={{ width: { xs: 1, sm: 130 }, height: 45 }}
          />
          <Skeleton
            variant="rounded"
            sx={{ width: { xs: 1, sm: 130 }, height: 45 }}
          />
          <Skeleton
            variant="rounded"
            sx={{ width: { xs: 1, sm: 130 }, height: 45 }}
          />
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
