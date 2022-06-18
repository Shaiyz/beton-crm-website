import alertReducer from "../features/alert/alert.reducer";
import authReducer from "../features/auth/auth.reducers";
import adminReducer from "../features/admin/admin.reducer";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/users/user.reducers";

const reducers = combineReducers({
  users: userReducer,
  auth: authReducer,
  alert: alertReducer,
  // admin: adminReducer,

  // notifications: notificationReducer,
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
