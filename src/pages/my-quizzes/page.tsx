import { Tab, Tabs } from "@app/ui/tabs";
import { Box, Typography } from "@mui/material";
import { OwnQuizzes } from "./components";

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
    tabComponent: (
      <Box px={3} py={1} borderBottom={1} borderColor="divider" my={5}>
        <Typography variant="h3">Quizzes in progress</Typography>
      </Box>
    ),
  },
  {
    label: "Favorites",
    value: "favorites",
    tabComponent: (
      <Box px={3} py={1} borderBottom={1} borderColor="divider" mb={5}>
        <Typography variant="h3">Favorite Quizzes</Typography>
      </Box>
    ),
  },
];

export const MyQuizzes = () => {
  return (
    <Box width={1} height={1} p={3}>
      <Tabs<TabTypes> defaultTab="my-quizzes" tabs={tabs} />
    </Box>
  );
};
