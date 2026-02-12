import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Stats from "./pages/Stats.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Stats />
  </StrictMode>,
);
