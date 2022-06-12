import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Grid, Tabs, Tab, CircularProgress, Button } from "@material-ui/core";
import Alert from "../Alert/Alert";
import icons from "../SearchTable/icons";
import MaterialTable from "material-table";
import "./Table.css";
import { Link } from "react-router-dom";

const TableUsers = ({
  header,
  loading,
  rows,
  path,
  columns,
  getAll,
  getAllInactive,
  getAllActive,
  value,
  setValue,
  label1,
  label2,
}) => {
  const styles = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid item xs={12}>
      <div className="table">
        <div className="table__head">
          <Grid container>
            <Grid item xs={8}>
              <h2 className={styles.heading2}>{header}</h2>
            </Grid>
            <Grid item xs={4} align="right">
              <Link to={`/${path}/add`} style={{ textDecoration: "none" }}>
                <Button
                  className={styles.btn}
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Add New {header}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
        <div className="alert-container">
          <Alert />
        </div>

        <div style={{ width: "100%" }}>
          {loading ? (
            <CircularProgress className="loader" />
          ) : (
            <MaterialTable
              title={
                <Tabs
                  className={styles.tabs}
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
                    label={header=="Tasks"?`Current ${header}`:`All ${header}`}
                    onClick={() => getAll()}
                  />
                  <Tab
                    className={styles.tab}
                    value={1}
                    label={label1}
                    onClick={() => getAllActive()}
                  />
                  <Tab
                    className={styles.tab}
                    value={2}
                    label={label2}
                    onClick={() => getAllInactive()}
                  />
                </Tabs>
              }
              icons={icons}
              data={rows}
              columns={columns}
              options={{
                search: true,
                pageSize: 20,
                pageSizeOptions: [5, 20, 50, 100],
                paginationType: "stepped",
                headerStyle: {
                  fontWeight: "bold",
                },
                rowStyle: {
                  fontSize: 14,
                  // fontWeight: "bold",
                  color: "#604339",
                  letterSpacing: "0.5px",
                },
              }}
            />
          )}
        </div>
      </div>
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  statusActive: {
    backgroundColor: "white",
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
  },
  statusInActive: {
    backgroundColor: "white",
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#1F1D61",
    color: "white",
    border: "1px solid white",
    textTransform: "initial",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
    },
  },
  tabs: {
    marginBottom: "2px",
  },
  tab: {
    fontSize: "12px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default TableUsers;
