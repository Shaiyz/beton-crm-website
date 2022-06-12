import React from "react";
import "./Form.css";
import Alert from "../Alert/Alert";
import {
  makeStyles,
  TextField,
  Grid,
  FormControl,
  Button,
  Typography,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";

const Form = ({ forminputs, handleSubmit, handleChange, header }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div className={classes.root}>
      <Typography className={classes.heading2}>{header}</Typography>

      <form onSubmit={handleSubmit}>
        {forminputs.map((forminput) => (
          <Grid item xs={12} sm={6}>
            <FormControl>
              <TextField
                style={{ width: 350, marginTop: 10, marginBottom: 10 }}
                id="outlined-uncontrolled"
                variant="outlined"
                type={"password"}
                value={forminput.value}
                name={forminput.name}
                placeholder={forminput.placeholder}
                onChange={handleChange}
                label={forminput.label}
              />
            </FormControl>
          </Grid>
        ))}
        <Grid container style={{ marginTop: 20 }}>
          <Button
            type="submit"
            variant="contained"
            style={{ width: 350, backgroundColor: "#1F1D61", color: "white" }}
          >
            Submit
          </Button>
        </Grid>
      </form>
      <div className="alert-container" style={{ marginTop: 20 }}>
        <Alert />
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 460,
    width: "max-width",
    backgroundColor: theme.palette.background.paper,
    paddingTop: 20,
    paddingBottom: 35,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 20,
  },
  heading2: {
    fontWeight: "bold",
    fontSize: "22px",
    lineHeight: 1.2,
    color: "#2D1967",
    marginBottom: 20,
  },
  primary: {
    margin: "auto",
  },
}));

export default Form;
