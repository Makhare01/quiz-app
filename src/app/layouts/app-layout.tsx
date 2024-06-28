import { GlobalLoadingIndicator } from "@app/ui/global-loading-indicator";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { NavBar } from "./components";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
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
      <NavBar />
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
