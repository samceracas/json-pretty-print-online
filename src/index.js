import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/home";
import * as serviceWorker from "./serviceWorker";
import "./css/tailwind.generated.css";

ReactDOM.hydrate(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
