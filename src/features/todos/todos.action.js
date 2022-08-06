import { backend } from "../../api";
import {
  getLoadingLists,
  getTodosListsFailure,
  getTodosListsSuccess,
  addTodoSuccess,
  deleteTodoSuccess,
  updateTodoSuccess,
  completeTodoSuccess,
} from "./todos.reducer";
import { setAlertMessage } from "../alert/alert.action";
import { getAllLeads, getMyLeads } from "../leads/leads.action";
import { getAllUnits } from "../units/units.action";

// Get All Todo users
export const getAllTodoTasks = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const { userInfo } = getState().auth;

    const res = await backend.get(`/leadTask/${userInfo._id}`);
    dispatch(getTodosListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getTodosListsFailure(err));
    }
  }
};

export const addTodoTask = (body, leadId) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.post(`/leadTask/${leadId}`, body);
    dispatch(addTodoSuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
    dispatch(getAllTodoTasks());
    dispatch(getAllLeads());
    dispatch(getMyLeads());
    if (body.client) {
      dispatch(getAllUnits());
    }
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getTodosListsFailure(err));
    }
  }
};

export const editTodoTask = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/leadTask/${id}`, body)
    .then((response) => {
      dispatch(updateTodoSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllTodoTasks());
      dispatch(getMyLeads());
      dispatch(getAllLeads());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getTodosListsFailure(err));
      }
    });
};
export const completeTodoTask = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/leadTask/${id}`, body)
    .then((response) => {
      dispatch(completeTodoSuccess(response.data.data));
      dispatch(setAlertMessage("Todo completed", "success"));
      dispatch(getAllTodoTasks());
      dispatch(getAllLeads());
      dispatch(getMyLeads());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getTodosListsFailure(err));
      }
    });
};

export const deleteTodoTask = (id) => async (dispatch, getState) => {
  await backend
    .delete(`/user/${id}`)
    .then((response) => {
      dispatch(deleteTodoSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllTodoTasks());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getTodosListsFailure(err));
      }
    });
};
