import { backend } from "../../api/index";
import {
  getLoadingLists,
  getUsersListsFailure,
  getUsersListsSuccess,
  getUserSuccess,
  updateUserSuccess,
  getActiveUsers,
} from "./user.reducers";
import { setAlertMessage } from "../alert/alert.action";

export const getAllUsers = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/user`);
    dispatch(getUsersListsSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getUser = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/user?_id=${id}`);
    dispatch(getUserSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getActiveUser = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/user`);
    dispatch(getActiveUsers(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getUsersByRole = (role) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/user?role=${role}`);
    dispatch(getUsersListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const getUsersByStatus = (role, status) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/user?role=${role}&isActive=${status}`);
    dispatch(getUsersListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getUsersListsFailure(err));
    }
  }
};

export const updateUser = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/user/updateUser/${id}`, body)
    .then((response) => {
      dispatch(updateUserSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUsersListsFailure(err));
      }
    });
};
