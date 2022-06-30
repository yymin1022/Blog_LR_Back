import {FirebaseApp, initializeApp} from "firebase/app";
import {collection, doc, Firestore, getDoc, getDocs, getFirestore, orderBy, query} from "firebase/firestore";

import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    appId: process.env.FB_APP_ID
};

let firebaseApp: FirebaseApp;
let firebaseDB: Firestore;

export const initFB = () => {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseDB = getFirestore();
}

export const getFBPostData = async (postType : string, postID : string) => {
    let resultCode = 200;
    let resultMsg = "Success";

    let resultData = {
        RESULT_CODE: resultCode,
        RESULT_MSG: resultMsg,
        RESULT_DATA: {}
    };

    let postContent = "";
    let postDate = "";
    let postDir = "";
    let postIsPinned = "";
    let postTag = "";
    let postTitle = "";
    let postURL = "";

    const postDocData = await getDoc(doc(firebaseDB, postType, postID));
    if(postDocData.exists()) {
        postDate = postDocData.data().date;
        postIsPinned = postDocData.data().isPinned;
        postTag = postDocData.data().tag;
        postTitle = postDocData.data().title;
        postURL = postDocData.data().url;

        postDir = `${process.env.POST_DATA_DIR}/${postType}/${postURL}`
        postContent = fs.readFileSync(`${postDir}/post.md`,"utf8");
    }else{
        postContent = "No such Post";
    }

    resultData.RESULT_CODE = resultCode;
    resultData.RESULT_MSG = resultMsg;
    resultData.RESULT_DATA = {
        PostContent: postContent,
        PostDate: postDate,
        PostIsPinned: postIsPinned,
        PostTag: postTag,
        PostTitle: postTitle,
        PostURL: postURL
    };
}

export const getFBPostImage = (postType : string, postID : string, srcID : string) => {
    console.log(`Post ID is ${postID}`);
    console.log(`Post Type is ${postType}`);
    console.log(`SRC ID is ${srcID}`);
}

export const getFBPostList = (postType : string) => {
    console.log(`Post Type is ${postType}`);
}