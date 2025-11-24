// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
import App from "./app/App";
import "./styles/globals.css";
import ErrorBoundary from "./components/feedback/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter as Router } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> */}
      <Router>
        <ThemeProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
          <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
      </Router>
      {/* </PersistGate>
    </Provider> */}
    </ErrorBoundary>
  </React.StrictMode>
);
