import { backend } from "../../api";
import { setAlertMessage } from "../alert/alert.action";
import {
  loginSuccess,
  loginFailed,
  logoutSuccess,
  getLoading,
  forgetEmailSuccess,
  changePasswordSuccess,
  changePasswordFailed,
} from "./auth.reducers";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const login = (body) => async (dispatch) => {
  dispatch(getLoading());
  await backend
    .post(`/user/signin`, body, config)
    .then((res) => {
      console.log(res.data);
      dispatch(loginSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(loginFailed(err));
      }
    });
};

export const forgetPassword = (email) => async (dispatch) => {
  dispatch(getLoading());
  if (!email) {
    dispatch(setAlertMessage("Please enter valid email", "error."));
    return;
  }
  const body = {
    email,
  };
  await backend
    .put(`/staff/password/forgot`, body, config)
    .then((res) => {
      dispatch(setAlertMessage(res.data.data.status, "success"));
      dispatch(forgetEmailSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(loginFailed(err));
      }
    });
};

export const changePassword = (id, body) => async (dispatch) => {
  dispatch(getLoading());
  await backend
    .put(`/user/${id}/password/change`, body)
    .then((res) => {
      dispatch(setAlertMessage(res.data.message, "success"));
      dispatch(changePasswordSuccess(res.data));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(changePasswordFailed(err));
      }
    });
};

export const changeAdminPassword = (id, body) => async (dispatch) => {
  dispatch(getLoading());
  await backend
    .put(`/user/${id}/password/change`, body)
    .then((res) => {
      dispatch(setAlertMessage(res.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(changePasswordFailed(err));
      }
    });
};

export const logout = (id) => async (dispatch) => {
  dispatch(getLoading());
  dispatch(logoutSuccess());
  localStorage.removeItem("token");
  dispatch(setAlertMessage("Successfully logged out", "success"));
};
