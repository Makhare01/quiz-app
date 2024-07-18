import { Box, Tabs as MuiTabs, Tab } from "@mui/material";
import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { TabPanel } from "./tab-panel";

export type Tab<T> = { label: string; value: T; tabComponent: ReactNode };

type Props<T> = {
  tabs: Array<Tab<T>>;
  defaultTab: T;
};

export const Tabs = <T extends string>({ tabs, defaultTab }: Props<T>) => {
  const [searchparams, setSearchParams] = useSearchParams();
  const activeTab = (searchparams.get("tab") ?? defaultTab) as T;

  const handleChange = (_event: React.SyntheticEvent, newValue: T) => {
    searchparams.set("tab", newValue);
    setSearchParams(searchparams);
  };

  const tabWidth = `${100 / tabs.length}%`;

  return (
    <>
      <Box
        sx={{
          width: 1,
          border: 1,
          borderColor: "divider",
          borderRadius: 3,
          mb: 3,
        }}
      >
        <MuiTabs
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
                width: tabWidth,
                maxWidth: tabWidth,
                zIndex: 1,
                "&.Mui-selected": {
                  color: "text.primary",
                },
              }}
            />
          ))}
        </MuiTabs>
      </Box>
      {tabs.map((tab) => (
        <TabPanel<T> key={tab.value} value={tab.value} activeTab={activeTab}>
          {tab.tabComponent}
        </TabPanel>
      ))}
    </>
  );
};
