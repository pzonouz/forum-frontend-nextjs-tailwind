import { combineReducers, configureStore } from "@reduxjs/toolkit";
import api from "./consumeAPI";
import filesReducer from "./filesSlice";

export const store = configureStore({
  reducer: combineReducers({
    [api.reducerPath]: api.reducer,
    filesReducer: filesReducer,
  }),
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(api.middleware);
  },
});
