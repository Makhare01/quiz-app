import { PathValue, paths } from "@app/routes";
import { Stack } from "@mui/material";
import { MenItem } from "./menu-item";

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
    <Stack flexDirection="row" gap={3} alignItems="center">
      {menuItems.map((menuItem) => (
        <MenItem key={menuItem.path} menuItem={menuItem} />
      ))}
    </Stack>
  );
};
