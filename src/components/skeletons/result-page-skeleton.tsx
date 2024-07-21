import { Box, Skeleton, Stack } from "@mui/material";

export const ResultPageSkeleton = () => {
  return (
    <Box
      sx={{
        flex: 1,
        overflow: "auto",
      }}
    >
      <Skeleton variant="text" sx={{ width: 200, my: 3 }} />

      <Skeleton variant="rounded" sx={{ width: 1, height: 100 }} />

      <Skeleton variant="text" sx={{ width: 200, my: 3 }} />

      <Stack spacing={1}>
        <Skeleton variant="rounded" sx={{ width: 1, height: 100 }} />
        <Skeleton variant="rounded" sx={{ width: 1, height: 150 }} />
        <Skeleton variant="rounded" sx={{ width: 1, height: 110 }} />
      </Stack>
    </Box>
  );
};
