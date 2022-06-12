import Login from "../views/Auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "../views/Auth/ForgotPassword";

export const routes = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/forget-password" exact component={ForgotPassword} />
      </Switch>
    </>
  );
};
