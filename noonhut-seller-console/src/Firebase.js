import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCxH-X5cbjXct8e6OzwkkxuA-S1xUESx40",
    authDomain: "noonhut-43fa6.firebaseapp.com",
    projectId: "noonhut-43fa6",
    storageBucket: "noonhut-43fa6.appspot.com",
    messagingSenderId: "921297141793",
    appId: "1:921297141793:web:3692c33ae8ff13e03b2360",
    measurementId: "G-9H341590BF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
