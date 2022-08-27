import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  todos: null,
  errors: false,
};
const todoSlice = createSlice({
  name: "todoService",
  initialState,
  reducers: {
    getLoadingLists: (state) => {
      state.loading = true;
    },
    getTodosListsSuccess: (state, { payload }) => {
      state.loading = false;
      state.todos = payload;
    },

    getTodosListsFailure: (state) => {
      state.loading = false;
      state.saved = false;
      state.hasErrors = true;
      state.todos = [];
    },
    addTodoSuccess: (state) => {
      state.loading = false;
      state.saved = true;
    },
    completeTodoSuccess: (state, { payload }) => {
      state.loading = false;
    },

    updateTodoSuccess: (state) => {
      state.loading = false;
      state.saved = true;
    },
    deleteTodoSuccess: (state) => {
      state.loading = false;
      state.saved = false;
    },
    resetTodo: (state) => {
      state.todos = null;
    },
    setSaved: (state, action) => {
      state.saved = action.payload;
    },
  },
});

const todoReducer = todoSlice.reducer;
export default todoReducer;
export const {
  getLoadingLists,
  getTodosListsFailure,
  getTodosListsSuccess,
  addTodoSuccess,
  deleteTodoSuccess,
  addSuperTodoSuccess,
  updateTodoSuccess,
  resetTodo,
  completeTodoSuccess,
  setSaved,
} = todoSlice.actions;
