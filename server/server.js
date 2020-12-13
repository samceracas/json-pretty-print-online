import express from "express";
import fs from "fs";
import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

import Home from "../src/pages/home";

const PORT = 3000;
const app = express();

app.use("^/$", (request, response, next) => {
  fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
    if (err) {
      return response
        .status(500)
        .send("An error has occured! Please try again later.");
    }
    return response.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<Home />)}</div>`
      )
    );
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
    console.log(`App launched on port ${PORT}`);
});