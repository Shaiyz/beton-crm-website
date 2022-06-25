import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tasks: [],
  errors: false,
};
const taskSlice = createSlice({
  name: "taskService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
    },
    getTasksListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.tasks = payload;
    },
    getTasksListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

const taskReducer = taskSlice.reducer;
export default taskReducer;

export const { getLoadingLists, getTasksListsFailure, getTasksListsSuccess } =
  taskSlice.actions;
