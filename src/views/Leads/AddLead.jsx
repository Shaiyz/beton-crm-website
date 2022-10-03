import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        value={value}
        onChange={handleChange}
      >
        <Tab
          className={styles.tab}
          value={0}
          label={'Single Lead'}
          onClick={()=>{} }
        />
        <Tab
          className={styles.tab}
          value={1}
          label={''}
          onClick={() => getAllActive()}
        />
      </Tabs>
    </Box>
  );
}
