// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
import App from "./app/App";
import "./styles/globals.css";
import ErrorBoundary from "./components/feedback/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* <Provider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
      {/* </PersistGate> */}
      {/* </Provider> */}
    </ErrorBoundary>
  </React.StrictMode>
);
