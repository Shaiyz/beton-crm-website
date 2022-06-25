import { backend } from "../../api/index";
import {
  getLoadingLists,
  getClientsListsFailure,
  getClientsListsSuccess,
  getClientSuccess,
  updateClientSuccess,
} from "./client.reducer";
import { setAlertMessage } from "../alert/alert.action";

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

export const getClient = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/client?_id=${id}`);
    dispatch(getClientSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getClientsListsFailure(err));
    }
  }
};

export const updateClient = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/client/updateClient/${id}`, body)
    .then((response) => {
      dispatch(updateClientSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllClients());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getClientsListsFailure(err));
      }
    });
};
