// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxjPKlKfOAPvlqwWf0F_bsngcTPbtWLT4",
  authDomain: "lopez-sandbox.firebaseapp.com",
  projectId: "lopez-sandbox",
  storageBucket: "lopez-sandbox.firebasestorage.app",
  messagingSenderId: "802509458843",
  appId: "1:802509458843:web:e4ba4cce2697ba7d94653e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;