import { backend } from "../../api";
import {
  getLoadingLists,
  getTodosListsFailure,
  getTodosListsSuccess,
  addTodoSuccess,
  deleteTodoSuccess,
  updateTodoSuccess,
} from "./todos.reducer";
import { setAlertMessage } from "../alert/alert.action";

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
    const res = await backend.post(`/leadTask/62a6053617837ff5b81d6a58`, body);
    dispatch(addTodoSuccess(res.data.data));
    dispatch(setAlertMessage(res.response.data.message, "success"));
    dispatch(getAllTodoTasks())
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
    .put(`/user/${id}`, body)
    .then((response) => {
      dispatch(updateTodoSuccess(response.data.data));
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
