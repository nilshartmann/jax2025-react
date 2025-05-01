import "./index.css";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("Cannot find the root element");
}

createRoot(rootElement).render(<App />);
