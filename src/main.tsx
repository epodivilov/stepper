import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { defaultTheme, Provider } from "@adobe/react-spectrum";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider theme={defaultTheme} width="100%" height="100%">
      <App />
    </Provider>
  </React.StrictMode>
);
