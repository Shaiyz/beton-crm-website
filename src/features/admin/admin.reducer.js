import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  admins: [],
  superadmins: [],
  errors: false,
};
const adminSlice = createSlice({
  name: "adminService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
      state.saved = false;
    },
    getAdminsListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.admins = payload;
      state.saved = false;
    },
    getSuperAdminsListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.superadmins = payload;
      state.saved = false;
    },
    getAdminsListsFailure: (state) => {
      state.loading = false;
      state.saved = false;
      state.hasErrors = true;
      state.admins = [];
      state.superadmins = [];
    },
    addAdminSuccess: (state) => {
      state.loading = false;
      state.saved = true;
    },
    addSuperAdminSuccess: (state) => {
      state.loading = false;
      state.saved = true;
    },
    updateUserSuccess: (state) => {
      state.loading = false;
      state.saved = true;
    },
    deleteAdminSuccess: (state) => {
      state.loading = false;
      state.saved = false;
    },
  },
});

const adminReducer = adminSlice.reducer;
export default adminReducer;
export const {
  getLoadingLists,
  getAdminsListsFailure,
  getAdminsListsSuccess,
  addAdminSuccess,
  deleteAdminSuccess,
  addSuperAdminSuccess,
  updateUserSuccess,
  getSuperAdminsListsSuccess,
} = adminSlice.actions;
