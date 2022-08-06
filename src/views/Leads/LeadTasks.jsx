import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getNames } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.secondary.dark}`,
    borderRadius: "5px",
    marginTop: "30px",
    padding: "20px",
    [theme.breakpoints.down("md")]: {
      marginTop: "30px",
    },
  },
  tabHeading: {
    fontSize: "32px",
    fontWeight: 550,
    margin: "0",
  },
  noteContainer: {
    padding: 10,
    margin: "10px 0",
  },
  noteHeading: {
    margin: 0,
    fontWeight: 600,
    fontSize: 16,
  },
  noteMsg: {
    margin: 0,
    fontWeight: 400,
    fontSize: 14,
  },
  noteDate: {
    margin: "5px 0 0 0",
    fontWeight: 450,
    fontSize: 14,
    color: theme.palette.secondary.main,
  },
}));

function LeadTasks() {
  const classes = useStyles();
  const { leadId } = useParams();
  const { leads, myleads, loading } = useSelector((state) => state.leads);
  const [lead, setleads] = useState();

  useEffect(() => {
    if (leads || myleads) {
      fetchLeadTasks();
    }
  }, [leads, myleads]);
  const fetchLeadTasks = () => {
    const data = leads
      ? leads.find((lead) => lead._id == leadId)
      : myleads.find((lead) => lead._id == leadId);
    setleads(data);
  };

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <h2 className={classes.tabHeading}>Leads Tasks</h2>
      </Box>
      {lead && lead.leadTasks.length > 0 ? (
        <Box>
          {lead.leadTasks.map((item, index) => (
            <Paper className={classes.noteContainer} key={index} elevation={2}>
              <h4 className={classes.noteHeading}>
                Task: {getNames(item.task.name)}
              </h4>
              <h5 className={classes.noteHeading}>
                Sub Task:
                {getNames(
                  item.task.subTasks.find((i) => i._id == item.subtask).name
                )}
              </h5>

              <p className={classes.noteMsg}>
                Completed: {item.completed ? "Yes" : "No"}
              </p>
              <p className={classes.noteMsg}>Message: {item.message}</p>

              <p className={classes.noteMsg}>
                Deadline:
                {new Date(
                  item.deadline ? item.deadline : new Date()
                ).toLocaleString()}
              </p>
            </Paper>
          ))}
        </Box>
      ) : loading === true ? (
        <Box>
          <Paper className={classes.noteContainer} elevation={2}>
            <Skeleton variant="rect" height={30} width={200} animation="wave" />
            <Skeleton animation="wave" width="90%" />
            <Skeleton animation="wave" width={100} style={{ marginTop: 6 }} />
          </Paper>
          <Paper className={classes.noteContainer} elevation={2}>
            <Skeleton variant="rect" height={30} width={200} animation="wave" />
            <Skeleton animation="wave" width="90%" />
            <Skeleton animation="wave" width={100} style={{ marginTop: 6 }} />
          </Paper>
          <Paper className={classes.noteContainer} elevation={2}>
            <Skeleton variant="rect" height={30} width={200} animation="wave" />
            <Skeleton animation="wave" width="90%" />
            <Skeleton animation="wave" width={100} style={{ marginTop: 6 }} />
          </Paper>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="h4"
            color="error"
            style={{ margin: "30px auto" }}
          >
            No task performed in this lead.
          </Typography>
        </Box>
      )}
    </div>
  );
}

export default LeadTasks;
