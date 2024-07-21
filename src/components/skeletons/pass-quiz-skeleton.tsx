import { Box, Skeleton, Stack } from "@mui/material";

export const PassQuizSkeleton = () => {
  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        flex={1}
        py={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          width={1}
          maxWidth={800}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Skeleton variant="text" sx={{ width: 250, mb: 3 }} />

          <Stack spacing={2}>
            <Skeleton variant="rounded" sx={{ width: 450, height: 50 }} />
            <Skeleton variant="rounded" sx={{ width: 450, height: 50 }} />
            <Skeleton variant="rounded" sx={{ width: 450, height: 50 }} />
          </Stack>
        </Box>
      </Box>

      <Skeleton variant="rectangular" sx={{ width: 1, height: 100 }} />
    </Box>
  );
};
