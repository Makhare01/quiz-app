import { Tabs } from "@app/ui/tabs";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { QuestionsTab } from "./questions-tab";
import { UsersTab } from "./users-tab";

type TabTypes = "users" | "questions";

const tabs: Array<{ label: string; value: TabTypes; tabComponent: ReactNode }> =
  [
    {
      label: "Users",
      value: "users",
      tabComponent: <UsersTab />,
    },
    {
      label: "Questions",
      value: "questions",
      tabComponent: <QuestionsTab />,
    },
  ];

export const DetailsTabs = () => {
  return (
    <Box width={1}>
      <Tabs<TabTypes> defaultTab="users" tabs={tabs} />
    </Box>
  );
};
