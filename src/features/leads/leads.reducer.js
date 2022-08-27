import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  saved: false,
  addLoader: false,
  leads: null,
  myleads: null,
  errors: false,
  editLeadLoader: false,
  lead: [],
};
const leadSlice = createSlice({
  name: "leadService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
      state.saved = false;
      state.addLoader = false;
    },
    setLoadingListOff: (state) => {
      state.loading = false;
      state.saved = false;
      state.addLoader = false;
    },

    getLoading: (state) => {
      state.addLoader = true;
    },

    getLeadListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.leads = payload;
    },
    getMyLeadListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.addLoader = false;
      state.myleads = null;
    },
    getMyLeadListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.myleads = payload;
    },

    getLeadListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
      state.addLoader = false;
      state.leads = null;
    },
    updateLeadSuccess: (state, { payload }) => {
      state.lead = payload;
      state.loading = false;
      state.saved = true;
    },

    addLeadSuccess: (state, { payload }) => {
      state.loading = false;
      state.saved = true;
      state.addLoader = false;
    },
    resetLeads: (state) => {
      state.leads = null;
      state.myleads = null;
    },
  },
});

const leadsReducer = leadSlice.reducer;

export default leadsReducer;
export const {
  getLoadingLists,
  resetLeads,
  setLoadingListOff,
  getLeadListsSuccess,
  getLeadListsFailure,
  addLeadSuccess,
  updateLeadSuccess,
  getMyLeadListsSuccess,
  getMyLeadListsFailure,
} = leadSlice.actions;
