import { Tab, Tabs } from "@app/ui/tabs";
import { Box } from "@mui/material";
import { FavoriteQuizzes, OwnQuizzes, QuizzesInProgress } from "./components";

type TabTypes = "my-quizzes" | "in-progress" | "favorites";

const tabs: Array<Tab<TabTypes>> = [
  {
    label: "My Quizzes",
    value: "my-quizzes",
    tabComponent: <OwnQuizzes />,
  },
  {
    label: "In Progress",
    value: "in-progress",
    tabComponent: <QuizzesInProgress />,
  },
  {
    label: "Favorites",
    value: "favorites",
    tabComponent: <FavoriteQuizzes />,
  },
];

export const MyQuizzes = () => {
  return (
    <Box width={1} height={1} p={3}>
      <Tabs<TabTypes> defaultTab="my-quizzes" tabs={tabs} />
    </Box>
  );
};
