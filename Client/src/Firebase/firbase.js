// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRN5v-jCpzE4LO0qMALP2SPaeH1E864Js",
  authDomain: "daistore.firebaseapp.com",
  projectId: "daistore",
  storageBucket: "daistore.appspot.com",
  messagingSenderId: "602994296332",
  appId: "1:602994296332:web:649e35d263cb85ae301029",
  measurementId: "G-D92Y9XPCJM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
