import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth"; // 코드 추가
import "firebase/compat/firestore";
import "firebase/compat/storage";



const firebaseConfig = {
  apiKey: "AIzaSyDlgh2gAKzPER-ureeKMMNVHhWGWuvoQKw",
  authDomain: "sample-4f89b.firebaseapp.com",
  projectId: "sample-4f89b",
  storageBucket: "sample-4f89b.appspot.com",
  messagingSenderId: "304592878292",
  appId: "1:304592878292:web:195703de005b98d7029941",
  measurementId: "G-4MH60QM8EP"
};

firebase.initializeApp(firebaseConfig);
export const firebaseInstance = firebase;
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 코드 추가
const firestore = firebase.firestore();
const storageRef = firebase.storage();
export { firestore };
export { storageRef };
