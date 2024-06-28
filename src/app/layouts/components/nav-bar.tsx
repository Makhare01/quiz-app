import { Box, Typography } from "@mui/material";
import { AppMenu } from "./app-menu";
import { UserProfileButton } from "./user-profile-button";

export const NavBar = () => {
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
      <Typography variant="h1" fontWeight={700} width="15%">
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
