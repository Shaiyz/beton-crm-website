import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  authenticated: false,
  loginError: false,
  loading: false,
  errorMessage: null,
  userRole: null,
  userId: null,
};
const authSlice = createSlice({
  name: "authService",
  initialState,
  reducers: {
    getLoading: (state) => {
      state.loading = true;
      state.loginError = false;
      state.errorMessage = null;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem("token", payload.token);
      state.userInfo = payload.data;
      state.userRole = payload.data.role;
      state.userId = payload.data._id;
      state.authenticated = true;
      state.loginError = false;
    },
    changePasswordSuccess: (state, { payload }) => {
      state.loading = false;
      localStorage.setItem("token", payload.token);
      state.userInfo = payload.data.user;
      state.userRole = payload.data.user.role;
      state.userId = payload.data.user._id;
      state.authenticated = true;
      state.loginError = false;
    },
    forgetEmailSuccess: (state, { payload }) => {
      state.loading = false;
      state.loginError = false;
    },
    loginFailed: (state, { payload }) => {
      state.loading = false;
      state.authenticated = false;
      state.loginError = true;
    },
    changePasswordFailed: (state, { payload }) => {
      state.loading = false;
      state.authenticated = true;
      state.loginError = true;
    },
    logoutSuccess: (state) => {
      localStorage.removeItem("token");
      state.authenticated = false;
      state.loginError = false;
      state.userInfo = null;
      state.loading = false;
    },
    registerSuccess: (state, { payload }) => {
      localStorage.setItem("token", payload.token);
      state.authenticated = true;
      state.loginError = false;
      state.userInfo = payload.data;
      state.loading = false;
    },

    registerFailure: (state, { payload }) => {
      state.loading = false;
      state.authenticated = false;
      state.loginError = true;
    },
  },
});
const authReducer = authSlice.reducer;
export default authReducer;

export const {
  fetchUserDataSuccess,
  forgetEmailSuccess,
  getLoading,
  loginSuccess,
  changePasswordSuccess,
  loginFailed,
  logoutSuccess,
  changePasswordFailed,
  registerSuccess,
  registerFailure,
} = authSlice.actions;
