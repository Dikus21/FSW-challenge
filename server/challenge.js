import http from "http";
import fs from "fs";
import {PORT} from "../public/scripts/env.js";

function onRequest(req, res) {
    console.log(req.url);
    let filePath = "";

    switch (req.url) {
        case "/":
            req.url = "/index.html";
            break;

        case "/car":
            req.url = "/car.html";
            break;

        case "/get-cars-data":
            req.url = "/cars.json";
            break;
    }
    if (req.url === "/cars.json") {
        filePath = "data" + req.url;
    } else {
        filePath = "public" + req.url;
    }

    fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.end("404 Not Found");
                return;
            } else if (req.url.match(".svg$")) {
                res.writeHead(200, {"Content-Type": "image/svg+xml"});
            } else if (req.url.match(".js")) {
                res.writeHead(200, {"Content-Type": "application/javascript"});
            } else {
                res.writeHead(200);
            }
        res.end(data);
        });
}

const server = http.createServer(onRequest);

server.listen(PORT, "", () => {
    console.log(`Server sudah berjalan, silahkan buka http://localhost:${PORT}`);
});