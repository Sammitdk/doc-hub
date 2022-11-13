import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Firebase from "./Firebase";
import reducer, { initialState } from "./reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Firebase initialState={initialState} reducer={reducer}>
    <App />
  </Firebase>
);
