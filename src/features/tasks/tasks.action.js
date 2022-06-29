import { backend } from "../../api/index";
import {
  getLoadingLists,
  getTasksListsFailure,
  getTasksListsSuccess,
} from "./tasks.reducer";

export const getAllTasks = () => async (dispatch) => {
  dispatch(getLoadingLists());
  try {
    const res = await backend.get(`/task`);
    dispatch(getTasksListsSuccess(res.data.data));
  } catch (err) {
    if (err) {
      dispatch(getTasksListsFailure(err));
    }
  }
};
