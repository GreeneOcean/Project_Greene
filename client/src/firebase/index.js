import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import config from '../../config.js';

const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY,
  authDomain: "greeneocean-37019.firebaseapp.com",
  projectId: "greeneocean-37019",
  storageBucket: "greeneocean-37019.appspot.com",
  messagingSenderId: config.FIREBASE_MSG_SENDER_ID,
  appId: config.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);