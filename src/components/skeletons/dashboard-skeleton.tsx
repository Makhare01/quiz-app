import { Box, Skeleton } from "@mui/material";

export const DashboardSkeleton = () => {
  return (
    <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
      {Array.from({ length: 10 }).map((_, index) => {
        return (
          <Skeleton
            key={`dashboard-skeleton-${index}`}
            variant="rounded"
            width={250}
            height={130}
          />
        );
      })}
    </Box>
  );
};
