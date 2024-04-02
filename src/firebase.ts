// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCEoStnp59JE3vmVMc_Y0K8cNw-A7haUSQ",
  authDomain: "dh2642-project-7eb8e.firebaseapp.com",
  databaseURL: "https://dh2642-project-7eb8e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dh2642-project-7eb8e",
  storageBucket: "dh2642-project-7eb8e.appspot.com",
  messagingSenderId: "230765286214",
  appId: "1:230765286214:web:7771f9814dfc7ac78e4b47",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);