import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/toast.css";

import { StrictMode } from "react";
import { App } from "./app";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
