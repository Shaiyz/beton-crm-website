import * as React from "react";
import { Tabs, Tab, Box, makeStyles } from "@material-ui/core";

import LeadsAdd from "./LeadsAddForm";
import LeadsExcelAdd from "./LeadsExcelAdd";
import { useSelector } from "react-redux";

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const styles = useStyles();
  const { userInfo } = useSelector((state) => state.auth);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {userInfo.role != "salesRep" && (
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
            label={"Single Lead"}
            onClick={() => setValue(0)}
          />
          <Tab
            className={styles.tab}
            value={1}
            label={"Leads with excel"}
            onClick={() => setValue(1)}
          />
        </Tabs>
      )}
      {value == 0 ? <LeadsAdd /> : <LeadsExcelAdd />}
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginBottom: "2px",
  },
  tab: {
    fontSize: "12px",
  },
}));
