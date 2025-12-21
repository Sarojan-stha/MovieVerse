import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Globalvariables from "./userContext/Globalvariables.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Globalvariables>
      <App />
    </Globalvariables>
  </StrictMode>
);
