import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxXdx4AdzTF0e9qeeJ3mrenAoZOjP0BH0",
  authDomain: "juno-37e47.firebaseapp.com",
  projectId: "juno-37e47",
  storageBucket: "juno-37e47.firebasestorage.app",
  messagingSenderId: "782853082043",
  appId: "1:782853082043:web:bb9bc75288aa1a4759929e",
  measurementId: "G-N6XZ5KB0Z3"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);