import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCdH4b2L6-hb3GVvwAEOYLH_j9vTkB6iK0",
  authDomain: "push-notification-cbee5.firebaseapp.com",
  projectId: "push-notification-cbee5",
  storageBucket: "push-notification-cbee5.appspot.com",
  messagingSenderId: "1013296633583",
  appId: "1:1013296633583:web:3aa1d5559117da67022d1a",
  measurementId: "G-39WLD81NKX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firestore
export const db = getFirestore(app);
