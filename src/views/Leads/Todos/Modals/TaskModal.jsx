import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Select from "react-select";
import { useSelector } from "react-redux";
import React from "react";
import Modal from "react-awesome-modal";
import { getNames } from "../../../../utils";
const useStyles = makeStyles((theme) => ({
  modalContainer: {
    width: "90%",
    margin: "20px auto",
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 550,
    marginBottom: 0,
  },
  modalLine: {
    margin: "20px auto",
    width: "100%",
    color: theme.palette.secondary.dark,
  },
  fieldLabel: {
    color: theme.palette.secondary.light,
    marginBottom: "8px",
    fontSize: "15px",
    fontWeight: 500,
  },
  inputField: {
    padding: "10px",
    borderRadius: "2px",
  },
  submitBtn: {
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
    width: 100,
    borderRadius: 2,
    padding: "8px 0",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  cancelBtn: {
    backgroundColor: theme.palette.secondary.dark,
    width: 100,
    borderRadius: 2,
    padding: "8px 0",
    color: theme.palette.secondary.light,
  },
}));

const TaskModal = (props) => {
  const classes = useStyles();
  const { tasks, error, loading } = useSelector((state) => state.tasks);
  const [subMenu, setSubMenu] = React.useState(null);
  const [task, setTask] = React.useState("");
  const [subTask, setSubTask] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleChange = (e) => {
    setTask(e.value);
    setSubMenu(
      tasks
        ?.filter((i) => i._id === e.value)[0]
        .subTasks.map((subTask) => {
          return { label: getNames(subTask.name), value: subTask._id };
        })
    );
  };

  let menu = tasks.map((i) => {
    return { label: getNames(i.name), value: i._id };
  });

  const handleChangeSubTask = (e) => {
    setSubTask(e.value);
  };
  const handleDateChange = (value) => {
    setSelectedDate(value);
  };
  return (
    <div className={classes.modalContainer}>
      <h3 className={classes.modalHeading}>Edit Task Details</h3>
      <hr className={classes.modalLine} />

      <Modal
        visible={props.visible}
        width="400"
        height="350"
        effect="fadeInUp"
        onClickAway={props.closeModal}
      >
        <Container>
          <Grid container spacing={3} lg={12}>
            <Grid item lg={12} xs={12}>
              <Box mb={2} mt={2}>
                <InputLabel className={classes.fieldLabel}>Task</InputLabel>
                <Select
                  label="Task"
                  onChange={handleChange}
                  options={menu}
                ></Select>
              </Box>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Box mb={2} mt={2}>
                <InputLabel className={classes.fieldLabel}>Sub Task</InputLabel>
                <Select
                  options={subMenu}
                  label="Sub Task"
                  onChange={handleChangeSubTask}
                />
              </Box>
            </Grid>
            <Box mb={2}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Minimum 3 rows"
                style={{ maxWidth: "300px", maxHeight: "100px" }}
              />
            </Box>
            <Grid item lg={12} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  label="Deadline Picker"
                  inputVariant="outlined"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              style={{ position: "absolute", top: 300, width: "350px" }}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Container>
      </Modal>
    </div>
  );
};

export default TaskModal;
