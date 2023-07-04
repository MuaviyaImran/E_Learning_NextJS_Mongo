
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB7ZPr1khYVAAmuisH6jReRGmvN-SWD18g",
  authDomain: "e-learning-1f88f.firebaseapp.com",
  projectId: "e-learning-1f88f",
  storageBucket: "e-learning-1f88f.appspot.com",
  messagingSenderId: "287588742481",
  appId: "1:287588742481:web:0f814099cb0bad8c260f70",
  measurementId: "G-WTDX6YZEX4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage();