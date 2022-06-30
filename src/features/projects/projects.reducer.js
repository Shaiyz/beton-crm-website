import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  projects: null,
  errors: false,
  project: null,
  activeProjects: [],
};
const projectSlice = createSlice({
  name: "projectService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
    },
    getProjectsListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.projects = payload;
    },

    getProjectSuccess: (state, { payload }) => {
      state.loading = false;
      state.project = payload;
    },

    getProjectsListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    updateProjectSuccess: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    resetProjects: (state) => {
      state.projects = null;
    },
  },
});

const projectReducer = projectSlice.reducer;
export default projectReducer;

export const {
  getLoadingLists,
  getProjectsListsFailure,
  getProjectsListsSuccess,
  getProjectSuccess,
  updateProjectSuccess,
  resetProjects,
} = projectSlice.actions;
