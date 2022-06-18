import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  makeStyles,
} from "@material-ui/core";
// import TransitionModal from "../../components/TransitionModal/TransitionModal";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import "../User.css";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
  label: {
    fontSize: "12px",
  },
  heading2: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
  },
  heading1: {
    fontWeight: 300,
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },
  label1: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
    letterSpacing: ".04rem",
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
  addamountinnerbtn: {
    backgroundColor: "#3f50b5",
    color: "black",
  },
  addtheamountbtn2: {
    backgroundColor: "#3f50b5",
    color: "white",
    position: "absolute",
    right: "0",
  },
  Pending: {
    backgroundColor: "#2eb85c",
    color: "black",
  },
  UpdateStatus: {
    color: "black",
  },
  addamountinnerbtncancel: {
    backgroundColor: "#e0e0e0",
    color: "white",
  },
  Rejected: {
    backgroundColor: "#e55353",
    color: "white",
  },
  bstatuscancelled: {
    backgroundColor: "#e55353",
    color: "white",
  },
  bstatusprogress: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  bstatusend: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  bstatusApproved: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  cleared: {
    border: "1px solid #2eb85c",
    color: "#2eb85c",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  notcleared: {
    border: "1px solid #e55353",
    color: "#e55353",
    fontWeight: "bold",
    backgroundColor: "white",
  },
  pstatusPending: {
    backgroundColor: "#f9b115",
    color: "white",
  },
  Cleared: {
    backgroundColor: "#2eb85c",
    color: "white",
  },
  NotCleared: {
    backgroundColor: "#e55353",
    color: "white",
  },
  cnicImageModal: {
    textTransform: "initial",
    color: "#1F1D61",
    fontSize: 14,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "white",
    },
    marginTop: -8,
    marginRight: 10,
  },
  headingAccordian: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  subheadingAccordian: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ViewUser = () => {
  const classes = useStyles();
  let { id } = useParams();
  const { users, loading } = useSelector((state) => state.users);
  const [expanded, setExpanded] = useState("panel1");
  const [userdetails, setuserdetails] = useState(null);
  const { authenticated, userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (id && users.length > 0) {
      setuserdetails(users.filter((user) => user._id == id)[0]);
    }
    if (!id) {
      setuserdetails(userInfo);
    }
  }, [users]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  console.log(userdetails);
  return loading ? (
    <CircularProgress className="loader" style={{ marginTop: 50 }} />
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div className="viewuser">
          <div className="viewuser__head">
            <Grid item xs={12} sm={4} align="left">
              <div className="viewuser__profileimage">
                {userdetails && userdetails?.profile_image ? (
                  <img src={userdetails && userdetails?.profile_image} />
                ) : (
                  <img src="/assets/images/OIP.jfif" />
                )}
                <h2
                  style={{
                    fontWeight: 300,
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                >
                  User Details
                </h2>
              </div>
            </Grid>
          </div>

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-label="Expand"
              aria-controls="additional-actions2-content"
              id="additional-actions2-header"
            >
              <Typography className={classes.headingAccordian}>
                User Details
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Full Name
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {userdetails &&
                  userdetails.first_name + " " + userdetails.last_name}
              </Typography>
            </AccordionDetails>

            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Mobile Number
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {userdetails && userdetails.phone}
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                CNIC
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {userdetails && userdetails.cnic}
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Gender
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {userdetails && userdetails.gender}
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Crm code
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {userdetails && userdetails.crm_code}
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography className={classes.subheadingAccordian}>
                Status
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {userdetails && userdetails.isActive === true
                  ? "Active"
                  : "In active"}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </Grid>
    </Grid>
  );
};

export default ViewUser;
