import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJJacx3HNR5hoAO9X2CqbIrhFrIkkJ9WU",
    authDomain: "farkle-web.firebaseapp.com",
    projectId: "farkle-web",
    storageBucket: "farkle-web.firebasestorage.app",
    messagingSenderId: "1097086142650",
    appId: "1:1097086142650:web:ac57db224de91580c79a83"
};

// Initialize app once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);