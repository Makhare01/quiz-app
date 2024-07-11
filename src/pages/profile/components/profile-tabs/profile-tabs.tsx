import { Tabs } from "@app/ui/tabs";
import { Box } from "@mui/material";
import { ReactNode } from "react";
import { InfoTab } from "./info-tab";
import { PasswordTab } from "./password-tab";

type TabTypes = "info" | "password";

const tabs: Array<{ label: string; value: TabTypes; tabComponent: ReactNode }> =
  [
    {
      label: "Personal Information",
      value: "info",
      tabComponent: <InfoTab />,
    },
    {
      label: "Change Password",
      value: "password",
      tabComponent: <PasswordTab />,
    },
  ];

export const ProfileTabs = () => {
  return (
    <Box sx={{ width: 1, maxWidth: { xs: 420, sm: 680 } }}>
      <Tabs<TabTypes> defaultTab="info" tabs={tabs} />
    </Box>
  );
};
