// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCMHt3G12-LCo9l3wmzNrlXu9jbFnkXYuQ",
  authDomain: "testform-a1af5.firebaseapp.com",
  projectId: "testform-a1af5",
  storageBucket: "testform-a1af5.appspot.com",
  messagingSenderId: "477651890963",
  appId: "1:477651890963:web:84b7e4cda8f92901dbe0e6",
  measurementId: "G-42NEZHV2ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {db, app};