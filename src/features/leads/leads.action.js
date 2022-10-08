import { backend } from "../../api/index";
import {
  getLoadingLists,
  getLeadListsSuccess,
  getLeadListsFailure,
  addLeadSuccess,
  updateLeadSuccess,
  getMyLeadListsFailure,
  getMyLeadListsSuccess,
  setLoadingListOff,
} from "./leads.reducer";
import { setAlertMessage } from "../alert/alert.action";
import { getLoading } from "../auth/auth.reducers";
import { getAllProjects } from "../projects/projects.action";
import { getAllClients } from "../client/client.action";

// get All lead
export const getAllLeads = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/lead`);
    dispatch(getLeadListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getLeadListsFailure(err));
    }
  }
};
export const getMyLeads = () => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  const { userInfo } = getState().auth;
  try {
    const res = await backend.get(`/lead?assignedTo=${userInfo._id}`);
    dispatch(getMyLeadListsSuccess(res.data.data));
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "warning"));
      dispatch(getMyLeadListsFailure(err));
    }
  }
};

export const addLead = (body) => async (dispatch, getState) => {
  dispatch(getLoading());
  try {
    const res = await backend.post(`/lead`, body);
    dispatch(addLeadSuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
    dispatch(getAllLeads());
    dispatch(getMyLeads());
    dispatch(getAllClients());
    dispatch(getAllProjects());
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getLeadListsFailure(err));
    }
  }
};

export const addLeads = (body) => async (dispatch) => {
  dispatch(getLoading());
  try {
    const res = await backend.post(`/lead/excel`, body);
    dispatch(addLeadSuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
    dispatch(getAllLeads());
    dispatch(getMyLeads());
    dispatch(getAllClients());
    dispatch(getAllProjects());
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getLeadListsFailure(err));
    }
  }
};

export const deleteLead = (id) => async (dispatch, getState) => {
  try {
    const res = await backend.delete(`/lead/${id}`);
    dispatch(setAlertMessage(res.data.message, "success"));
    dispatch(getAllLeads());
    dispatch(getMyLeads());
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
      dispatch(getLeadListsFailure(err));
    }
  }
};

export const duplicateLead = (body) => async (dispatch, getState) => {
  dispatch(getLoading());
  try {
    const res = await backend.post(`/lead/duplicate`, body);
    dispatch(addLeadSuccess(res.data.data));
    dispatch(setAlertMessage(res.data.message, "success"));
    dispatch(getAllLeads());
    dispatch(getMyLeads());
    dispatch(getAllProjects());
  } catch (err) {
    if (err.response) {
      dispatch(setAlertMessage(err.response.data.message, "error"));
    }
  }
};

export const updateLead = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/lead/${id}`, body)
    .then((response) => {
      dispatch(updateLeadSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllLeads());
      dispatch(getMyLeads());
      dispatch(getAllClients());
      dispatch(getAllProjects());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
      }
      dispatch(setLoadingListOff());
    });
};
