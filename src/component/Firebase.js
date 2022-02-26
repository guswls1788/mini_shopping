// // Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat/app';
// import {initializeApp} from 'firebase/app';
// // import  'firebase/compat/auth';
// import {getAuth} from 'firebase/auth';
// import 'firebase/compat/analytics'
// import 'firebase/compat/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_FIREBASE_APPID,
//   measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENTID
// };

// // Initialize Firebase

// // firebase.initializeApp(firebaseConfig);

// export const firebaseInstance = firebase;
// // export const auth = firebase.auth();
// const app =initializeApp(firebaseConfig)
// export const auth = getAuth(app);




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';

import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 코드 추가
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlgh2gAKzPER-ureeKMMNVHhWGWuvoQKw",
  authDomain: "sample-4f89b.firebaseapp.com",
  projectId: "sample-4f89b",
  storageBucket: "sample-4f89b.appspot.com",
  messagingSenderId: "304592878292",
  appId: "1:304592878292:web:195703de005b98d7029941",
  measurementId: "G-4MH60QM8EP"
};

// Initialize Firebase
export const firebaseInstance = firebase;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 코드 추가