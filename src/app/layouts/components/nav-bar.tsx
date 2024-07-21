import { IconBurgerMenu, IconQuiz } from "@app/assets/icons";
import { paths } from "@app/routes";
import { useBoolean } from "@lib/hooks";
import { Box, Drawer, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppMenu } from "./app-menu";
import { UserProfileButton } from "./user-profile-button";

export const AppLogo = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        width: 1,
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
  );
};

export const NavBar = () => {
  const isOpen = useBoolean();

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 1,
        height: 75,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "15%" }}>
        <IconBurgerMenu
          sx={{
            cursor: "pointer",
            display: { xs: "block", md: "none " },
          }}
          onClick={isOpen.toggle}
        />
        <AppLogo />
      </Box>

      <Drawer open={isOpen.isTrue} onClose={isOpen.setFalse}>
        <AppMenu />
      </Drawer>

      <Box
        sx={{
          width: "70%",
          alignItems: "center",
          justifyContent: "center",
          display: { xs: "none", md: "flex" },
        }}
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
