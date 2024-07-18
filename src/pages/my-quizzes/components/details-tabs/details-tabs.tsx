import { QuizUser } from "@api/quiz";
import { Tab, Tabs } from "@app/ui/tabs";
import { Box } from "@mui/material";
import { QuestionsTab } from "./questions-tab";
import { UsersTab } from "./users-tab";

type TabTypes = "users" | "questions";

const tabs: (
  questionsId: string,
  users: Array<QuizUser>
) => Array<Tab<TabTypes>> = (questionsId, users) => [
  {
    label: "Users",
    value: "users",
    tabComponent: <UsersTab users={users} />,
  },
  {
    label: "Questions",
    value: "questions",
    tabComponent: <QuestionsTab questionsId={questionsId} />,
  },
];

type Props = {
  questionsId: string;
  users: Array<QuizUser>;
};

export const DetailsTabs = ({ questionsId, users }: Props) => {
  return (
    <Box width={1}>
      <Tabs<TabTypes> defaultTab="users" tabs={tabs(questionsId, users)} />
    </Box>
  );
};
