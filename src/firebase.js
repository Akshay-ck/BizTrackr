import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// replace with your config from Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAVfaNDi8C3wfctXHBARQYWwb7RAepYUxo",
  authDomain: "my-zak-analytics.firebaseapp.com",
  projectId: "my-zak-analytics",
  storageBucket: "my-zak-analytics.firebasestorage.app",
  messagingSenderId: "1066973413529",
  appId: "1:1066973413529:web:a89d0bf4eef15087aff808"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
