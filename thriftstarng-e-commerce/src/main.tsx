import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./sassStyles/index.scss";
import { AppProvider } from "./contexts/AppContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </React.StrictMode>
);
