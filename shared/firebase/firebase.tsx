import firebase from "firebase/compat/app";
import { config as configDotenv } from "dotenv";

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

console.log(
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_TYPE,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_PROJECT_ID,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_PRIVATE_KEY_ID,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_PRIVATE_KEY,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_CLIENT_EMAIL,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_CLIENT_ID,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_AUTH_URI,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_TOKEN_URI,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_AUTH_PROVIDER_X509_CERT_URL,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_CLIENT_X509_CERT_URL,
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK_UNIVERSE_DOMAIN
  );

  console.log(
    process.env.NEXT_PUBLIC_API_KEY,
     process.env.NEXT_PUBLIC_AUTH_DOMAIN,
     process.env.NEXT_PUBLIC_PROJECT_ID,
     process.env.NEXT_PUBLIC_STORAGE_BUCKET,
     process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
     process.env.NEXT_PUBLIC_APP_ID,
     process.env.NEXT_PUBLIC_MEASUREMENT_ID,
     process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  );