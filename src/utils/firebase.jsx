/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyAyiFYoh63HnBItby4rtMEb-T4ZAKfwzzk",
  authDomain: "newassignment-a837d.firebaseapp.com",
  projectId: "newassignment-a837d",
  storageBucket: "newassignment-a837d.firebasestorage.app",
  messagingSenderId: "286232075763",
  appId: "1:286232075763:web:db1285244b60ca9cce4686",
  measurementId: "G-JRT5SCPZXX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();