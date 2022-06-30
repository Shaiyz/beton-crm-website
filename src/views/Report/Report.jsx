import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { monthNames } from "./months";
import "./Report.css";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePrinter } from "react-icons/ai";
import { printDiv } from "../../utils";
import { Helmet } from "react-helmet";

const Report = () => {
  const styles = useStyles();
  var now = new Date();
  let date = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  React.useEffect(() => {
    setStartDate(year + "-0" + month + "-" + "01");
    setEndDate(year + "-0" + month + "-" + 30);
    let body = {
      startDate: year + "-0" + month + "-" + "01",
      endDate: year + "-0" + month + "-" + 30,
    };
    // dispatch(getAllEarnings(body));
  }, []);
  const customSearch = (e) => {
    e.preventDefault();
    let body = { startDate: startDate, endDate: endDate };
    // dispatch(getAllEarnings(body));
  };

  return (
    <Grid item xs={12} lg={14}>
      <Helmet title="Report - CRM"></Helmet>
      <div className="viewuser__head">
        <Grid container>
          <Grid item xs={12} sm={12}>
            <h2 className={styles.heading2}>
              Monthly summary - {monthNames[month]}
            </h2>
          </Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <label style={{ marginTop: 15, marginRight: 10 }}>Start date</label>
            <input
              type="date"
              placeholder="Start Date"
              style={{ marginRight: 8, width: 200 }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={7} sm={7} lg={4}>
            <label style={{ marginTop: 15, marginRight: 10 }}>End date</label>
            <input
              type="date"
              placeholder="End Date"
              style={{ marginRight: 8, width: 200 }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={4}>
            <Button
              onClick={(e) => customSearch(e)}
              className={styles.btn}
              variant="contained"
              startIcon={<AiOutlineSearch />}
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} lg={4} justifyContent="end">
            <Button
              onClick={() => printDiv("print-div")}
              className={styles.btn}
              variant="contained"
              startIcon={<AiOutlinePrinter />}
            >
              Print
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className={styles.root}>
        <Grid container lg={12} id="print-div">
          <Grid item lg={4} xs={12} sm={12}>
            <Accordion expanded={true}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AccordionSummary aria-label="Expand">
                  <Typography className={styles.headingAccordian}>
                    Leads
                  </Typography>
                </AccordionSummary>
              </div>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  Assigned
                </Typography>
                <Typography className={styles.secondaryHeading}>
                  0.00
                </Typography>
              </AccordionDetails>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  Added
                </Typography>
                <Typography className={styles.secondaryHeading}>
                  0.00
                </Typography>
              </AccordionDetails>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  TLW
                </Typography>
                <Typography className={styles.secondaryHeading}>
                  0.00
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item lg={4} xs={12} sm={12}>
            <Accordion expanded={true}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AccordionSummary aria-label="Expand">
                  <Typography className={styles.headingAccordian}>
                    Calls
                  </Typography>
                </AccordionSummary>
              </div>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  Verified calls
                </Typography>
                <Typography className={styles.secondaryHeading}>10</Typography>
              </AccordionDetails>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  Total TT
                </Typography>
                <Typography className={styles.secondaryHeading}>20</Typography>
              </AccordionDetails>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  AT Calls
                </Typography>
                <Typography className={styles.secondaryHeading}>10</Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item lg={4} xs={12} sm={12}>
            <Accordion expanded={true}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AccordionSummary aria-label="Expand">
                  <Typography className={styles.headingAccordian}>
                    Meetings
                  </Typography>
                </AccordionSummary>
              </div>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  Met
                </Typography>
                <Typography className={styles.secondaryHeading}>
                  0.00
                </Typography>
              </AccordionDetails>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  U Met
                </Typography>
                <Typography className={styles.secondaryHeading}>
                  0.00
                </Typography>
              </AccordionDetails>
              <AccordionDetails
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography className={styles.subheadingAccordian}>
                  Met/Met P
                </Typography>
                <Typography className={styles.secondaryHeading}>
                  0.00
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};
const useStyles = makeStyles({
  root: {
    marginTop: "20px",
  },
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
  },
  btn: {
    height: 40,
    backgroundColor: "#1F1D61",
    color: "white",
    marginTop: 10,
    border: "1px solid white",
    textTransform: "initial",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#1F1D61",
    },
  },
  headingAccordian: {
    fontSize: "18px",
    flexBasis: "33.33%",
    flexShrink: 0,
  },
});

export default Report;
