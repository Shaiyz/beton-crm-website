import { v4 as uuidv4 } from "uuid";
import {
    setAlert,
    removeAlert
} from "./alert.reducer";

export const setAlertMessage = (msg, alertType, timeout = 3000) => (dispatch) => {
    const id = uuidv4();
    const payload={msg, alertType,id}
    dispatch(setAlert(payload))
    setTimeout(() => dispatch(removeAlert(id)), timeout);
};
