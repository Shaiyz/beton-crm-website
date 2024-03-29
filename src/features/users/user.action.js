import { backend } from "../../api/index";
import {
  getLoadingLists,
  getUsersListsFailure,
  getUsersListsSuccess,
  getUserSuccess,
  updateUserSuccess,
  addUserSuccess,
  addClientSuccess,
  getClientsListsFailure,
  getClientsListsSuccess,
  changePasswordSuccess,
  getchangePasswordFailure,
  addLeadSuccess,
  getLeadListsSuccess,
  getLeadListsFailure,

  // getActiveUsers,
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

export const updateUser = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/user/${id}`, body)
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

export const addUser = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .post(`/user/create`, body)
    .then((response) => {
      dispatch(addUserSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.data.message, "success"));
      dispatch(getAllUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUsersListsFailure(err));
      }
    });
};

export const changePassword = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/user/${id}/password/change`, body)
    .then((response) => {
      dispatch(changePasswordSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getchangePasswordFailure(err));
      }
    });
};

export const getAllClients = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/client`);
    dispatch(getClientsListsSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getClientsListsFailure(err));
    }
  }
};

export const addClient = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .post(`/client`, body)
    .then((response) => {
      dispatch(addClientSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.data.message, "success"));
      dispatch(getAllClients());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getClientsListsFailure(err));
      }
    });
};