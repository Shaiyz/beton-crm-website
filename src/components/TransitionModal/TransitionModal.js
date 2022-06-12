import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, CircularProgress, Backdrop, Modal } from "@material-ui/core";

export default function TransitionModal(props) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          {props.loading ? (
            <CircularProgress className="loader" />
          ) : (
            <div className={classes.paper}>{props.children}</div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: "5px",
    padding: theme.spacing(2, 4, 3),
  },
}));
