import { backend } from "../../api/index";
import {
  getLoadingLists,
  getCallsListsFailure,
  getCallsListsSuccess,
} from "./calls.reducer";

export const getCalls = (id, date) => async (dispatch, getState) => {
  dispatch(getLoadingLists());
  try {
    const {
      data: { data },
    } = await backend.get(`/call/${id}/${date.start}/${date.end}`);
    dispatch(getCallsListsSuccess(data));
  } catch (err) {
    if (err) {
      dispatch(getCallsListsFailure(err));
    }
  }
};
