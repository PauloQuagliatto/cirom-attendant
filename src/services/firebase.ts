import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY as string,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN as string,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL as string,
  projectId: import.meta.env.VITE_APP_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGE_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_APP_ID as string,
};

const app = initializeApp(firebaseConfig);

const fbAuth = getAuth();
const db = getFirestore(app);
const fbStorage = getStorage();

export { db, fbAuth, fbStorage };
