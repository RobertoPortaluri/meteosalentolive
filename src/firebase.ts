// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// SOSTITUISCI QUESTI VALORI CON QUELLI DELLA TUA CONSOLE FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAsj3zRFgURs04edfAhevYvB9YBccOsHa0",
  authDomain: "meteosalentolive-lug25.firebaseapp.com",
  projectId: "meteosalentolive-lug25",
  storageBucket: "meteosalentolive-lug25.firebasestorage.app",
  messagingSenderId: "454836430403",
  appId: "1:454836430403:web:f71b927dc30b4fd08016f6",
  measurementId: "G-VQZPQXR79Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
