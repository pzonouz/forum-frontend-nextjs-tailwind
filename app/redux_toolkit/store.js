import { combineReducers, configureStore } from "@reduxjs/toolkit";
import api from "./consumeAPI";

export const store = configureStore({
  reducer: combineReducers({
    [api.reducerPath]: api.reducer,
  }),
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(api.middleware);
  },
});
