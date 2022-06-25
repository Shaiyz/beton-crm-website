import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  units: null,
  errors: false,
  unit: [],
  activeUnits: [],
};
const unitSlice = createSlice({
  name: "unitService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
    },
    getUnitsListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.units = payload;
    },

    getUnitSuccess: (state, { payload }) => {
      state.loading = false;
      state.unit = payload;
    },

    getUnitsListsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
    updateUnitSuccess: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

const unitReducer = unitSlice.reducer;
export default unitReducer;

export const {
  getLoadingLists,
  getUnitsListsFailure,
  getUnitsListsSuccess,
  getUnitSuccess,
  updateUnitSuccess,
} = unitSlice.actions;
