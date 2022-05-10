import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "greeneocean-37019.firebaseapp.com",
    projectId: "greeneocean-37019",
    storageBucket: "greeneocean-37019.appspot.com",
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);