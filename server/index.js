import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import path from "path";
import fs from "fs";
import serialize from "serialize-javascript";
import { StaticRouter, matchPath } from "react-router-dom";
import Routes from "../src/routes";

import App from "../src/components/App";

const PORT = process.env.PORT || 3006;
const app = express();
console.log(__dirname)

app.get("/", (req, res) => {
    res.status(301).redirect("/news");
});
app.use(express.static("./build"));

app.get("/*", (req, res) => {
    const currentRoute =
    Routes.find((route) => {
        const url = req.url.split("?");
        return matchPath(url[0], route);
    }) || {};

    let promise;
    if (currentRoute.loadData) {
        promise = currentRoute.loadData(
            req.query && req.query.page ? req.query.page : 0
        );
    } else {
        promise = Promise.resolve(null);
    }

    promise.then((data) => {
        const context = { data };
        const app = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        );

        const indexFile = path.resolve("./build/index.html");
        fs.readFile(indexFile, "utf8", (err, indexData) => {
            if (err) {
                console.error("Something went wrong:", err);
                return res.status(500).send("Oops, better luck next time!");
            }

            if (context.status === 404) {
                res.status(404);
            }

            return res.send(
                indexData
                    .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
                    .replace(
                        "</body>",
                        `<script>window.__ROUTE_DATA__ = ${serialize(data)}</script></body>`
                    )
            );
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
