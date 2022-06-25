import {
  Card,
  CardContent,
  Typography,
  Button,
  makeStyles,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import Formfield from "../../components/Formfeild/Formfeild";
import Alert from "../../components/Alert/Alert";
import { loginFormConfig } from "./AuthFormConfig";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/auth.action";
import Helmet from "react-helmet";

const useStyle = makeStyles((theme) => ({
  BannerSec: {
    padding: "70px 0",
    height: "100vh",
    background: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), url('assets/images/beton.jpeg') 50% 50%`,
  },
  LoginSec: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)) `,
    marginBottom: "20px",
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

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { authenticated, loading } = useSelector((state) => state.auth);
  const { alerts } = useSelector((state) => state.alert);
  const classes = useStyle();
  const [formData, setFormData] = useState(loginFormConfig);

  if (authenticated) {
    history.push(`/`);
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

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      email: formData.email.value,
      password: formData.password.value,
    };
    dispatch(login(body));
  };
  return (
    <>
      <Helmet>
        <title>Login - CRM</title>
      </Helmet>

      <Grid xs={12} md={12} lg={12} container>
        <Grid
          lg={7}
          md={12}
          sm={12}
          xs={12}
          item
          className={classes.BannerSec}
        ></Grid>
        <Grid lg={5} md={12} sm={12} xs={12} item className={classes.LoginSec}>
          <Card className={classes.Cardroot}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Login To CRM
              </Typography>
              <br />
              <hr />
              {loading && <CircularProgress />}
              {alerts && <Alert variant="error">{alerts.msg}</Alert>}
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
                  Login
                </Button>
              </form>

              <Typography variant="body2" component="p">
                Forgot your password?
                <Link to="/forget-password">Click here</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
