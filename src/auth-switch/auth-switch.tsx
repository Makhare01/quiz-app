import { useAuth } from "@app/auth";
import { Box, CircularProgress } from "@mui/material";
import { match } from "ts-pattern";
import { AuthApp } from "./auth-app";
import { UnauthApp } from "./unauth-app";

export const AuthSwitch = () => {
  const { user } = useAuth();

  return match(user)
    .with({ state: "loading" }, () => (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    ))
    .with({ state: "authenticated" }, () => <AuthApp />)
    .otherwise(() => <UnauthApp />);
};
