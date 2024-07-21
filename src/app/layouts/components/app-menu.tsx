import { PathValue, paths } from "@app/routes";
import { Box, Divider, Stack } from "@mui/material";
import { MenItem } from "./menu-item";
import { AppLogo } from "./nav-bar";

export type MenuItem = {
  name: string;
  path: PathValue;
};

const menuItems: Array<MenuItem> = [
  {
    name: "Dashboard",
    path: paths.dashboard,
  },
  {
    name: "My quizzes",
    path: paths.myQuizzes,
  },
  {
    name: "Create",
    path: paths.createQuiz,
  },
];

export const AppMenu = () => {
  return (
    <Stack
      flexDirection={{ xs: "column", md: "row" }}
      gap={3}
      alignItems={{ xs: "flex-start", md: "center" }}
      minWidth={300}
      p={{ xs: 3, md: 0 }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          width: 1,
        }}
      >
        <AppLogo />

        <Divider sx={{ my: 1 }} />
      </Box>
      {menuItems.map((menuItem) => (
        <MenItem key={menuItem.path} menuItem={menuItem} />
      ))}
    </Stack>
  );
};
