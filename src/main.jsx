import React from "react";
import ReactDOM from "react-dom/client";

// Expose React/ReactDOM as globals for the legacy components that
// reference them via `window.React` / bare `React` identifier.
window.React = React;
window.ReactDOM = ReactDOM;

// Side-effect imports — each module attaches its exports onto `window`.
// Order matters: tweaks-panel and data must load before chrome/views.
import "./tweaks-panel.jsx";
import "./data.jsx";
import "./chrome.jsx";
import "./views.jsx";
import "./contribgraph.jsx";
import "./newsletter.jsx";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
