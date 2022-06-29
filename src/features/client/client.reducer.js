import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  clients: [],
  errors: false,
  client: [],
  activeClients: [],
};
const clientSlice = createSlice({
  name: "clientService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
    },
    getClientsListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.clients = payload;
    },

    getClientSuccess: (state, { payload }) => {
      state.loading = false;
      state.client = payload;
    },

    getClientsListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    updateClientSuccess: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

const clientReducer = clientSlice.reducer;
export default clientReducer;

export const {
  getLoadingLists,
  getClientsListsFailure,
  getClientsListsSuccess,
  getClientSuccess,
  updateClientSuccess,
} = clientSlice.actions;
