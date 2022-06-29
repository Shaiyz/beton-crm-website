import { backend } from "../../api";
import {
  getLoadingLists,
  getAdminsListsFailure,
  getAdminsListsSuccess,
  addAdminSuccess,
  deleteAdminSuccess,
  getSuperAdminsListsSuccess,
  updateUserSuccess,
} from "./admin.reducer";
import { setAlertMessage } from "../alert/alert.action";

// Get All Admin users
export const getAllAdminUsers = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/user?role=teamLead`);
    dispatch(getAdminsListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getAdminsListsFailure(err));
    }
  }
};

export const getAllSuperAdminUsers = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/user?role=superadmin`);
    dispatch(getSuperAdminsListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getAdminsListsFailure(err));
    }
  }
};

export const addAdminUser = (body) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.post(`/user/create/admin`, body);
    dispatch(addAdminSuccess(res.data.data));
    dispatch(setAlertMessage(res.response.data.message, "success"));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getAdminsListsFailure(err));
    }
  }
};

export const editAdminUser = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/user/${id}`, body)
    .then((response) => {
      dispatch(updateUserSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllAdminUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getAdminsListsFailure(err));
      }
    });
};

export const deleteAdminUser = (id) => async (dispatch, getState) => {
  await backend
    .delete(`/user/${id}`)
    .then((response) => {
      dispatch(deleteAdminSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllAdminUsers());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getAdminsListsFailure(err));
      }
    });
};
