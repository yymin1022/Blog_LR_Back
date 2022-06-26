import express, { Request, Response } from "express";
import http from "http";

const app = express();
const server = http.createServer(app);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

server.listen(8080, "0.0.0.0", () => {
    console.log("Server listen on port 8080");
});