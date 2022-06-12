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
import Formfield from "../../components/Formfeild/Formfeild";
import Alert from "../../components/Alert/Alert";
import { loginFormConfig } from "./AuthFormConfig";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/auth.action";
import Helmet from "react-helmet";

const useStyle = makeStyles((theme) => ({
  loginSec: {
    padding: "70px 0",
    width: "100%",
    height: "80vh",
    background: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), url('assets/images/bg.jpg') 50% 50% `,
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

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { authenticated, loading } = useSelector((state) => state.auth);

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
      <section className={classes.loginSec}>
        <Card className={classes.Cardroot}>
          <CardContent>
            <Typography variant="h6" component="h2">
              Login To CRM
            </Typography>
            <br />
            <hr />
            {/* {loading && <CircularProgress />} */}
            {/* {loginErrors && <Alert variant="error">{loginErrors}</Alert>} */}
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
      </section>
    </>
  );
};

export default Login;
