import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  units: null,
  errors: false,
  unit: [],
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
    addUnitSuccess: (state) => {
      state.loading = false;
      state.saved = true;
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
  addUnitSuccess,
} = unitSlice.actions;
