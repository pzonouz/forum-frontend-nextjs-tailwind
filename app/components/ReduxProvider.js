"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux_toolkit/store";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
};

export default ReduxProvider;
