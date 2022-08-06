import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
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
import { useSelector } from "react-redux";
import { backend } from "../../api/index";
import { Link, useParams } from "react-router-dom";

const Report = () => {
  const styles = useStyles();
  var now = new Date();
  let day = new Date().getDay();
  day = day < 10 ? "0" + day : day;
  let month = now.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let year = now.getFullYear();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { userInfo } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  const [report, setReport] = useState(null);
  const { id } = useParams();
  const meetingTask = tasks?.find((task) => task.name == "meeting");
  const arrange = meetingTask?.subTasks.find((i) => i.name == "arrange");
  const done = meetingTask?.subTasks.find((i) => i.name == "done");
  const [userId, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (id) {
      setId(id);
    } else {
      setId(userInfo._id);
    }
  }, []);

  React.useEffect(() => {
    if (userId) {
      let date = `${year}-${month}-${day}`;
      setStartDate(date);
      setEndDate(date);
      let body = {
        startDate: date,
        endDate: date,
      };

      (async () => {
        setLoading(true);
        try {
          const {
            data: { data },
          } = await backend.get(
            `/report/${userId}/${body.startDate}/${body.endDate}?done=${done._id}&arrange=${arrange._id}`
          );
          setReport(data);
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [userId]);

  const customSearch = (e) => {
    e.preventDefault();
    let body = { startDate: startDate, endDate: endDate };
    (async () => {
      setLoading(true);

      try {
        const {
          data: { data },
        } = await backend.get(
          `/report/${userId}/${body.startDate}/${body.endDate}?done=${done._id}&arrange=${arrange._id}`
        );
        setReport(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  };
  return (
    <Grid item xs={12} lg={12} style={{ padding: 30 }}>
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

      {loading ? (
        <CircularProgress className="loader" />
      ) : (
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
                    {report && report.leadAssigned}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className={styles.subheadingAccordian}>
                    Added
                  </Typography>
                  <Typography className={styles.secondaryHeading}>
                    {report && report.leadAdded}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className={styles.subheadingAccordian}>
                    TLW
                  </Typography>
                  <Typography className={styles.secondaryHeading}>
                    {report && report.TLW}
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
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/calls"
                    >
                      Verified calls
                    </Link>
                  </Typography>
                  <Typography className={styles.secondaryHeading}>
                    {report && report.verifiedCalls}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className={styles.subheadingAccordian}>
                    Total TT
                  </Typography>
                  <Typography className={styles.secondaryHeading}>
                    {report &&
                      new Date(parseInt(report.TTT) * 1000)
                        .toISOString()
                        .substring(11, 19)}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className={styles.subheadingAccordian}>
                    AT Calls
                  </Typography>
                  <Typography className={styles.secondaryHeading}>
                    {report &&
                      new Date(
                        parseInt(report.ATT ? report.ATT : "00:00") * 1000
                      )
                        .toISOString()
                        .substring(11, 19)}
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
                    {report && report.met}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className={styles.subheadingAccordian}>
                    U Met
                  </Typography>
                  <Typography className={styles.secondaryHeading}>-</Typography>
                </AccordionDetails>
                <AccordionDetails
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography className={styles.subheadingAccordian}>
                    Met Arranged
                  </Typography>
                  <Typography className={styles.secondaryHeading}>
                    {report && report.metArranged}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div>
      )}
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
