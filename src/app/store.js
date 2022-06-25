import alertReducer from "../features/alert/alert.reducer";
import authReducer from "../features/auth/auth.reducers";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/users/user.reducers";
import leadsReducer from "../features/leads/leads.reducer";
import projectReducer from "../features/projects/projects.reducer";
import unitReducer from "../features/units/units.reducer";
import clientReducer from "../features/client/client.reducer";
import taskReducer from "../features/tasks/tasks.reducer";
import todoReducer from "../features/todos/todos.reducer";

const reducers = combineReducers({
  users: userReducer,
  auth: authReducer,
  alert: alertReducer,
  leads: leadsReducer,
  projects: projectReducer,
  units: unitReducer,
  clients: clientReducer,
  tasks: taskReducer,
  todos: todoReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
