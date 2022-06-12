import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";
import Select from "react-select";

import React from "react";
import Modal from "react-awesome-modal";
import { menu } from "./menu";
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

  const [task, setTask] = React.useState("call");
  const [subTask, setSubTask] = React.useState("");
  const handleChange = (e) => {
    setTask(e.value);
  };
  const handleChangeSubTask = (e) => {
    setSubTask(e.value);
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
          <Grid container lg={12}>
            <Grid item lg={12} xs={12}>
              <Box mb={2} mt={2}>
                <InputLabel className={classes.fieldLabel}>Task</InputLabel>
                <Select
                  label="Task"
                  onChange={handleChange}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  options={menu}
                ></Select>
              </Box>
            </Grid>
            <Grid item lg={12} xs={12}>
              <Box mb={2}>
                <InputLabel className={classes.fieldLabel}>Sub Task</InputLabel>
                <Select
                  value={
                    menu
                      ? menu
                          .filter((i) => i.value === task)[0]
                          .submenu.filter((x) => x.value === subTask)
                      : []
                  }
                  options={menu.filter((i) => i.value === task)[0].submenu}
                  label="Sub Task"
                  onChange={handleChangeSubTask}
                ></Select>
              </Box>
            </Grid>
            <Box mb={2}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={5}
                placeholder="Minimum 3 rows"
                style={{ width: 200 }}
              />
            </Box>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
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
