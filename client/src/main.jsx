import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { registerSW } from "virtual:pwa-register";

// if ("serviceWorker" in navigator) {
//   registerSW({ immediate: false });
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
