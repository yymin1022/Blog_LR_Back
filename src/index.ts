import express, { Request, Response } from "express";

import dotenv from "dotenv";
import http from "http";

const app = express();
const server = http.createServer(app);

dotenv.config();

app.get("/", (req: Request, res: Response) => {
    res.redirect(process.env["URL_PUB"] as string);
});

server.listen(8080, "0.0.0.0", () => {
    console.log("Server listen on port 8080");
});