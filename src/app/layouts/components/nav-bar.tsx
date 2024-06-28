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
      <Typography
        variant="h1"
        sx={{ width: "15%", fontWeight: 700, cursor: "pointer" }}
        onClick={() => {
          navigate(paths.dashboard);
        }}
      >
        Quiz
      </Typography>

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
