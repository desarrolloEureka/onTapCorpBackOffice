import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { config as configDotenv } from "dotenv";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
/* const firebaseConfig = {
    apiKey: "AIzaSyBsybfHvoAj3Bvtzu_WwFq3fj9bWOYVziM",
    authDomain: "onetapcorp-d0146.firebaseapp.com",
    projectId: "onetapcorp-d0146",
    storageBucket: "onetapcorp-d0146.appspot.com",
    messagingSenderId: "828170350312",
    appId: "1:828170350312:web:e023c1b6a14e680233235d",
    measurementId: "G-ES4RD6WMNW"
}; */

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    backendBaseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth, firebaseConfig };

