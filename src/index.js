import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css"; // make sure style.css exists in src

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
