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
    let resultData = {
        RESULT_CODE: 0,
        RESULT_MSG: "",
        RESULT_DATA: {
            PostContent: "",
            PostDate: "",
            PostIsPinned: "",
            PostTag: "",
            PostTitle: "",
            PostURL: ""
        }
    };

    const postDocData = await getDoc(doc(firebaseDB, postType, postID));
    if(postDocData.exists()){
        resultData.RESULT_DATA.PostDate = postDocData.data().date;
        resultData.RESULT_DATA.PostIsPinned = postDocData.data().isPinned;
        resultData.RESULT_DATA.PostTag = postDocData.data().tag;
        resultData.RESULT_DATA.PostTitle = postDocData.data().title;

        let postURL = postDocData.data().url
        resultData.RESULT_DATA.PostURL = postURL;

        let postDir = `${process.env.POST_DATA_DIR}/${postType}/${postURL}`
        resultData.RESULT_DATA.PostContent = fs.readFileSync(`${postDir}/post.md`,"utf8");

        resultData.RESULT_CODE = 200;
        resultData.RESULT_MSG = "Success";
    }else{
        resultData.RESULT_CODE = 100;
        resultData.RESULT_MSG = "No Such Post!";
    }

    return resultData;
}

export const getFBPostImage = (postType : string, postID : string, srcID : string) => {
    let resultCode = 200;
    let resultData = {
        RESULT_CODE: 0,
        RESULT_MSG: "",
        RESULT_DATA: {
            ImageData: ""
        }
    };
    let resultMsg = "Success";

    let srcDir = "";
    if(postType != "solving"){
        srcDir = `${process.env.POST_DATA_DIR}/${postType}/${postID}`;
    }else{
        srcDir = `${process.env.POST_DATA_DIR}/${postType}`;
    }

    try{
        let tempData = fs.readFileSync(`${srcDir}/${srcID}`);
        let srcData = Buffer.from(tempData).toString("base64");

        resultData.RESULT_DATA = {
            ImageData: srcData
        };
    }catch(error){
        resultCode = 100;
        resultMsg = error as string;
    }

    resultData.RESULT_CODE = resultCode;
    resultData.RESULT_MSG = resultMsg;
}

export const getFBPostList = async (postType : string) => {
    interface postData {
        postDate: string;
        postID: string;
        postIsPinned: boolean;
        postTag: string[];
        postTitle: string;
        postURL: string;
    }

    let postList: postData[] = [];
    let resultData = {
        RESULT_CODE: 0,
        RESULT_MSG: "",
        RESULT_DATA: {
            postCount: 0,
            postList: postList
        }
    };

    let postCollectionList = await getDocs(query(collection(firebaseDB, postType), orderBy("isPinned", "desc")));
    postCollectionList.forEach((curData) => {
        resultData.RESULT_DATA.postCount++;
        let postData = {
            "postDate": curData.get("date"),
            "postID": curData.id,
            "postIsPinned": curData.get("isPinned"),
            "postTag": curData.get("tag"),
            "postTitle": curData.get("title"),
            "postURL": curData.get("url"),
        };
        resultData.RESULT_DATA.postList.push(postData);
    });

    resultData.RESULT_CODE = 200;
    resultData.RESULT_MSG = "Success";

    return resultData;
}