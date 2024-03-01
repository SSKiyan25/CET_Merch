// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDahJFHKlF9l_q4OVNSDpdtOLh4xcNx2Po",
  authDomain: "csshoppee-76342.firebaseapp.com",
  projectId: "csshoppee-76342",
  storageBucket: "csshoppee-76342.appspot.com",
  messagingSenderId: "783825646575",
  appId: "1:783825646575:web:694a536c0c678a136fbc1a",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
