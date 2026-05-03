import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { InvitationProvider } from "./context/InvitationContext";
import { getRouter } from "./router";
import "./styles.css";

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <InvitationProvider><RouterProvider router={getRouter()} /></InvitationProvider>
    </React.StrictMode>,
  );
}
