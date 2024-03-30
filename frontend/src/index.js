import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { AuthProvider } from "./context/AuthProvider";
import reducer, { initialState } from "./Reducer";
import { SearchProvider } from "./context/SearchProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <AuthProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthProvider>
    </StateProvider>
  </React.StrictMode>
);
