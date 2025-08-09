import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import Store from "./redux/store.js";

import "./index.css";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  // <StrictMode>
  <Provider store={Store}>
    <App />
  </Provider>
  // </StrictMode>
);
