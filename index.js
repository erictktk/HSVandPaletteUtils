import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as pau from 'eric-pixelarrayutils/BlendModes';.

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
