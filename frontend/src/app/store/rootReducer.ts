import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "initialization"],
};

const navPersistConfig = {
  key: "nav",
  storage,
  whitelist: ["lastRoute"],
};

import { persistReducer } from "redux-persist";
import authReducer from "../../features/auth/store/slice";
import navReducer from "./navigationSlice";

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedNavReducer = persistReducer(navPersistConfig, navReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer, // ✅ persisted
  nav: persistedNavReducer, // ✅ persisted
});

export default rootReducer;
