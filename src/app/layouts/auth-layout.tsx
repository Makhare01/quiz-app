import { paths } from "@app/routes";
import { GlobalLoadingIndicator } from "@app/ui/global-loading-indicator";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  const navigate = useNavigate();

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
      <GlobalLoadingIndicator />
      <Box
        sx={{ p: 2, cursor: "pointer" }}
        onClick={() => {
          navigate(paths.signIn);
        }}
      >
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
