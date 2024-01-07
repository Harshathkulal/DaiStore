// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBT96tiF_mIH8yQ0i5sh5vjwnpJtjM3ynk",
  authDomain: "pixtel-firebase.firebaseapp.com",
  projectId: "pixtel-firebase",
  storageBucket: "pixtel-firebase.appspot.com",
  messagingSenderId: "794514731455",
  appId: "1:794514731455:web:7227b705083dcf6c79b10a",
  measurementId: "G-TBRMCCZBKM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
