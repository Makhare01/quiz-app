import { GlobalLoadingIndicator } from "@app/ui/global-loading-indicator";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { NavBar } from "./components";

type Props = {
  children: ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  const location = useLocation();

  const isPassingQuizPage = location.pathname.includes("/pass");

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
      {!isPassingQuizPage && <NavBar />}
      <Box
        sx={{
          height: 1,
          maxHeight: isPassingQuizPage ? 1 : "calc(100% - 75px)",
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
