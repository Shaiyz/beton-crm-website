import { createSlice } from "@reduxjs/toolkit";

const initialState = { alerts: null };
const alertSlice = createSlice({
    name: "alertService",
    initialState,
    reducers: {
        setAlert: (state, { payload }) => {
            state.alerts = payload;
        },
        removeAlert: (state, { payload }) => {
            state.alerts = null
        },
    },
});
const alertReducer = alertSlice.reducer;
export default alertReducer;

export const { setAlert, removeAlert } = alertSlice.actions;
