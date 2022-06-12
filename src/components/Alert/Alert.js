import React from "react";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";

const AlertMessage = () => {
  const { alerts } = useSelector((state) => state.alert);
  return alerts
    ? alerts !== null && (
        <Alert key={alerts.id} variant="filled" severity={alerts.alertType}>
          {alerts.msg}
        </Alert>
      )
    : "";
};
export default AlertMessage;
