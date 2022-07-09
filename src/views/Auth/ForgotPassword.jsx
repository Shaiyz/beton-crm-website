import {
  Card,
  CardContent,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Formfield from "../../components/Formfeild/Formfeild";
import Alert from "../../components/Alert/Alert";
import { forgetPasswordFormConfig, loginFormConfig } from "./AuthFormConfig";
import { backend } from "../../api";
import { setAlertMessage } from "../../features/alert/alert.action";
import { useDispatch } from "react-redux";

const useStyle = makeStyles((theme) => ({
  loginSec: {
    padding: "70px 0",
    width: "100%",
    height: "80vh",
    background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2)), url('assets/images/hero-img.webp') 100% 50% no-repeat`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  Cardroot: {
    maxWidth: 315,
    textAlign: "center",
    padding: "20px",

    [theme.breakpoints.only("xs")]: {
      maxWidth: 280,
    },
  },
  form: {
    padding: "10px",
    margin: "0",
  },
}));

const ForgetPassword = ({ history }) => {
  const { authnticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const classes = useStyle();
  const [formData, setFormData] = useState(forgetPasswordFormConfig);

  if (authnticated) {
    history.push(`/reports`);
  }

  const formValueChangeHandler = (event, fieldIdentifier) => {
    const updatedForm = {
      ...formData,
      [fieldIdentifier]: {
        ...formData[fieldIdentifier],
        elementConfig: { ...formData[fieldIdentifier].elementConfig },
        value: event.target.value,
      },
    };

    setFormData(updatedForm);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError(null);
      const { data } = await backend.put("/user/password/forget", {
        email: formData.email.value,
      });
      setLoading(false);
      dispatch(setAlertMessage("Please check your email.", "success"));
      // history.push("/login");
    } catch (error) {
      setLoading(false);
      dispatch(
        setAlertMessage(
          error.response ? error.response.data.message : error.message
        )
      );
    }
  };

  return (
    <section className={classes.loginSec}>
      <Card className={classes.Cardroot}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Your new password will be sent to your email.
          </Typography>
          <br />
          <Typography variant="body2" component="p">
            Go to Login Page? <Link to="/">Login</Link>
          </Typography>
          <hr />
          {loading && <CircularProgress />}
          <Alert variant="success"></Alert>
          {error && <Alert variant="error">{error}</Alert>}
          <form onSubmit={formSubmitHandler} className={classes.form}>
            {Object.keys(formData).map((el) => (
              <Formfield
                key={el}
                label={formData[el].label}
                elementType={formData[el].elementType}
                value={formData[el].value}
                elementConfig={formData[el].elementConfig}
                options={formData[el].options}
                required={formData[el].validatingRules.required}
                invalid={!formData[el].valid}
                invalidMessage={formData[el].validityMessage}
                valueChanged={(event) => formValueChangeHandler(event, el)}
              />
            ))}
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgetPassword;
