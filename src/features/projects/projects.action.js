import { backend } from "../../api/index";
import {
  addProjectSuccess,
  getLoadingLists,
  getProjectsListsFailure,
  getProjectsListsSuccess,
  getProjectSuccess,
  updateProjectSuccess,
} from "./projects.reducer";
import { setAlertMessage } from "../alert/alert.action";

export const getAllProjects = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/project`);
    dispatch(getProjectsListsSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getProjectsListsFailure(err));
    }
  }
};

export const getProject = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/project?_id=${id}`);
    dispatch(getProjectSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getProjectsListsFailure(err));
    }
  }
};

export const updateProject = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/project/${id}`, body)
    .then((response) => {
      dispatch(updateProjectSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllProjects());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getProjectsListsFailure(err));
      }
    });
};

export const addProject = (body) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .post(`/project`, body)
    .then((response) => {
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllProjects());
      dispatch(addProjectSuccess());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getProjectsListsFailure(err));
      }
    });
};
