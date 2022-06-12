import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import Alert from "../Alert/Alert";
import "./Table.css";
import MaterialTable from "material-table";
import icons from "./icons";
const Table = ({ rows, columns, loading, header, path }) => {
  let history = useHistory();

  const redirect = (event, rowData) => {
    history.push(`/category-pricing/${rowData.action}`);

    // return <Redirect to={`/category-pricing/${rowData.action}`} />;
  };
  const styles = useStyles();
  return (
    <>
      <div className="table">
        <div className="table__head">
          <Grid container>
            <Grid item xs={8}>
              <h2 className={styles.heading2}>{header}</h2>
            </Grid>
            <Grid item xs={4} align="right">
              <Link to={`/${path}/add`} style={{ textDecoration: "none" }}>
                {header !== "Payment" &&
                  header !== "Most Active Renters" &&
                  header !== "Most Active Owners" &&
                  header !== "Booking Requests" &&
                  header !== "Most Booked Cars" && (
                    <Button
                      className={styles.btn}
                      variant="contained"
                      startIcon={<AddIcon />}
                    >
                      Add New {header}
                    </Button>
                  )}
              </Link>
            </Grid>
          </Grid>{" "}
        </div>

        <div className="alert-container">
          <Alert />
        </div>
        <div style={{ width: "100%" }}>
          {loading ? (
            <CircularProgress className="loader" />
          ) : (
            <MaterialTable
              title={false}
              icons={icons}
              data={rows}
              columns={columns}
              sortable={false}
              // onRowClick={redirect}
              options={{
                pageSize: 20,
                pageSizeOptions: [5, 20, 50, 100],
                paginationType: "stepped",
                search: true,
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
    </>
  );
};
const useStyles = makeStyles({
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
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
});

export default Table;
