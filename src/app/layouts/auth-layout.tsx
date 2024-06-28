import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        width: 1,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h1" fontWeight={700}>
          Quiz
        </Typography>
      </Box>
      <Box
        sx={{
          height: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
