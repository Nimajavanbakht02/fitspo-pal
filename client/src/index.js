import React from "react";
import { createContext } from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";

const ThemeContext = createContext();

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default ThemeContext;