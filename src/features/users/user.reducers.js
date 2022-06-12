import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  errors: false,
  user: [],
  activeUsers: [],
};
const userSlice = createSlice({
  name: "userService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
    },
    getUsersListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },

    getActiveUsers: (state, { payload }) => {
      state.loading = false;
      state.activeUsers = payload;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },

    getUsersListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    updateUserSuccess: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
export const {
  getLoadingLists,
  getUsersListsFailure,
  getActiveUsers,
  getUsersListsSuccess,
  getUserSuccess,
  updateUserSuccess,
} = userSlice.actions;
