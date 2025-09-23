import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

import { persistReducer } from "redux-persist";
import authReducer from "../../features/auth/store/slice";

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer, // ✅ persisted
});

export default rootReducer;
