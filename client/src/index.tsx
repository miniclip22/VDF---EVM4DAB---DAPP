import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
