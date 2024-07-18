import { Box, CircularProgress } from "@mui/material";

type Props = {
  centered?: boolean;
};

export const Loader = ({ centered }: Props) => {
  if (centered) {
    return (
      <Box
        width={1}
        height={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <CircularProgress />;
};
