import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getDocs, getFirestore, orderBy, query} from "firebase/firestore";

import dotenv from "dotenv";

dotenv.config();
const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    appId: process.env.FB_APP_ID
};

let firebaseApp;
let firebaseDB;

export const initFB = () => {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseDB = getFirestore();
}

export const getFBPostList = (postType : string) => {

}