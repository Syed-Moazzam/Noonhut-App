import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCxH-X5cbjXct8e6OzwkkxuA-S1xUESx40",
    authDomain: "noonhut-43fa6.firebaseapp.com",
    projectId: "noonhut-43fa6",
    storageBucket: "noonhut-43fa6.appspot.com",
    messagingSenderId: "921297141793",
    appId: "1:921297141793:web:6cf9663bc15e0f1a3b2360",
    measurementId: "G-E4QQF9TW0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);