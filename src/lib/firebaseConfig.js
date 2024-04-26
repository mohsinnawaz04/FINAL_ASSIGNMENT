// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ecommerce-crud-assignment.firebaseapp.com",
  projectId: "ecommerce-crud-assignment",
  storageBucket: "ecommerce-crud-assignment.appspot.com",
  messagingSenderId: "471352560488",
  appId: "1:471352560488:web:2288b66ec2dda3e45b24dd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage();

export const imagesRef = ref(storage, "images");
