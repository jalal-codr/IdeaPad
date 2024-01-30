// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqKfcP_U5_fMHv5JkoB3u6sJ0b8xWpkkQ",
  authDomain: "ideapad-e59c7.firebaseapp.com",
  projectId: "ideapad-e59c7",
  storageBucket: "ideapad-e59c7.appspot.com",
  messagingSenderId: "504881749065",
  appId: "1:504881749065:web:e2d207bb51fd901f59f398",
  measurementId: "G-1PY3H0JBKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();