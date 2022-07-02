import express, { Request, Response } from "express";

import dotenv from "dotenv";
import http from "http";

import * as CORS from "./CorsUtil";
import * as FB from "./FirebaseUtil";

dotenv.config();
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({extended : false}));

CORS.setCors(app);
FB.initFB();

app.get("/", (req: Request, res: Response) => {
    res.redirect(process.env["URL_PUB"] as string);
});

app.post("/getPostData", async (req: Request, res: Response) => {
    let postID: string = req.body.postID
    let postType: string = req.body.postType;
    let resultData: object = await FB.getFBPostData(postType, postID);
    
    res.send(resultData);
})
    
app.post("/getPostImage", (req: Request, res: Response) => {
    let postID: string = req.body.postID;
    let postType: string = req.body.postType;
    let srcID: string = req.body.srcID;
    let resultData: object = FB.getFBPostImage(postType, postID, srcID);
    
    res.send(resultData);
})

app.post("/getPostList", async (req: Request, res: Response) => {
    let postType: string = req.body.postType;
    let resultData: object = await FB.getFBPostList(postType);

    res.send(resultData);
})

server.listen(8080, "0.0.0.0", () => {
    console.log("Server listen on port 8080");
});