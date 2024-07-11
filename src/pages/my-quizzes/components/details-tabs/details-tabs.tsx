import { TabPanel } from "@components/tab-panel";
import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

type TabTypes = "users" | "questions";

const tabs: Array<{ label: string; value: TabTypes; tabComponent: ReactNode }> =
  [
    {
      label: "Users",
      value: "users",
      tabComponent: <Box />,
    },
    {
      label: "Questions",
      value: "questions",
      tabComponent: <Box />,
    },
  ];

export const DetailsTabs = () => {
  const [searchparams, setSearchParams] = useSearchParams();
  const activeTab = (searchparams.get("tab") ?? "users") as TabTypes;

  const handleChange = (_event: React.SyntheticEvent, newValue: TabTypes) => {
    searchparams.set("tab", newValue);
    setSearchParams(searchparams);
  };

  return (
    <Box sx={{ width: 1 }}>
      <Box
        sx={{
          width: 1,
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          mb: 3,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          sx={{
            bgcolor: "transparent",
            width: 1,
          }}
          TabIndicatorProps={{
            sx: {
              bgcolor: "white",
              height: 1,
              zIndex: 0,
              borderRadius: 3,
              color: "red",
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              disableRipple
              sx={{
                width: "50%",
                maxWidth: "50%",
                zIndex: 1,
                "&.Mui-selected": {
                  color: "text.primary",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab) => (
        <TabPanel<TabTypes>
          key={tab.value}
          value={tab.value}
          activeTab={activeTab}
        >
          {tab.tabComponent}
        </TabPanel>
      ))}
    </Box>
  );
};
