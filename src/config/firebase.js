// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDtNbxRQinfYoCAdKVc5guHE-sDDIyUkLE",
  authDomain: "litetube-39532.firebaseapp.com",
  projectId: "litetube-39532",
  storageBucket: "litetube-39532.appspot.com",
  messagingSenderId: "997842276667",
  appId: "1:997842276667:web:83b33e2ed3e1bb7142e71e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()