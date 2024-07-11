import { IconQuiz } from "@app/assets/icons";
import { paths } from "@app/routes";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppMenu } from "./app-menu";
import { UserProfileButton } from "./user-profile-button";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        px: 3,
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          width: "15%",
        }}
        onClick={() => {
          navigate(paths.dashboard);
        }}
      >
        <IconQuiz color="success" sx={{ color: " success" }} />
        <Typography variant="h1" sx={{ fontWeight: 700 }}>
          uiz
        </Typography>
      </Box>

      <Box
        width="70%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <AppMenu />
      </Box>
      <Box
        width="15%"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <UserProfileButton />
      </Box>
    </Box>
  );
};
