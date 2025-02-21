import { Tab, Tabs } from "@app/ui/tabs";
import { Box } from "@mui/material";
import { InfoTab } from "./info-tab";
import { PasswordTab } from "./password-tab";

type TabTypes = "info" | "password";

const tabs: Array<Tab<TabTypes>> = [
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
    <Box sx={{ width: 1, maxWidth: { xs: 420, sm: 680 }, p: 3 }}>
      <Tabs<TabTypes> defaultTab="info" tabs={tabs} />
    </Box>
  );
};
