import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  calls: null,
  errors: false,
};
const callSlice = createSlice({
  name: "callService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
    },
    getCallsListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.calls = payload;
    },

    getCallsListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

const callReducer = callSlice.reducer;
export default callReducer;

export const { getLoadingLists, getCallsListsFailure, getCallsListsSuccess } =
  callSlice.actions;
