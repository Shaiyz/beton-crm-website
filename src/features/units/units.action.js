import { backend } from "../../api/index";
import {
  getLoadingLists,
  getUnitsListsFailure,
  getUnitsListsSuccess,
  getUnitSuccess,
  updateUnitSuccess,
} from "./units.reducer";
import { setAlertMessage } from "../alert/alert.action";

export const getAllUnits = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/unit`);
    dispatch(getUnitsListsSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getUnitsListsFailure(err));
    }
  }
};

export const getUnit = (id) => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/unit?_id=${id}`);
    dispatch(getUnitSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getUnitsListsFailure(err));
    }
  }
};

export const updateUnit = (body, id) => async (dispatch) => {
  dispatch(getLoadingLists());
  await backend
    .put(`/unit/updateUnit/${id}`, body)
    .then((response) => {
      dispatch(updateUnitSuccess(response.data.data));
      dispatch(setAlertMessage(response.data.message, "success"));
      dispatch(getAllUnits());
    })
    .catch((err) => {
      if (err.response) {
        dispatch(setAlertMessage(err.response.data.message, "error"));
        dispatch(getUnitsListsFailure(err));
      }
    });
};
