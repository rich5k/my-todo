import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBG15vbuaRBqVI3HH-sj0oGCN_L954ES0U",
  authDomain: "my-todo-8e6f9.firebaseapp.com",
  projectId: "my-todo-8e6f9",
  storageBucket: "my-todo-8e6f9.appspot.com",
  messagingSenderId: "242717636833",
  appId: "1:242717636833:web:0c79fbe6896095a1431fa0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
export { db };