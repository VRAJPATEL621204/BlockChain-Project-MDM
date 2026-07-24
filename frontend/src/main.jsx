import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4200,
        style: {
          background: "rgba(15, 23, 42, 0.96)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.35)",
          backdropFilter: "blur(20px)",
          borderRadius: "18px",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#030712",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#030712",
          },
        },
      }}
    />

    <App />

  </React.StrictMode>
);