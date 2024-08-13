// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHccGkESPaosACXRooRp-se5TCCICf7GA",
  authDomain: "create-trip-1689a.firebaseapp.com",
  projectId: "create-trip-1689a",
  storageBucket: "create-trip-1689a.appspot.com",
  messagingSenderId: "878039151790",
  appId: "1:878039151790:web:734f328357ca16b340693f",
  measurementId: "G-9RK40X95R6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
//const analytics = getAnalytics(app);