import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { Toaster } from "react-hot-toast";
import 'leaflet/dist/leaflet.css';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        success: {
          style: {
            background: "#36d399",
            color: "#000",
            fontWeight: "bold",
          },
        },
        error: {
          style: {
            background: "#f87272",
            color: "#fff",
            fontWeight: "bold",
          },
        },
      }}
    />
  </React.StrictMode>
);


serviceWorkerRegistration.register();

