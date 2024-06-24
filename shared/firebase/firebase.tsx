import firebase from 'firebase/compat/app';

// Add the Firebase products that you want to use
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC2yJFccHS8v9EFAuhJNS3XT5kFY2znL38",
    authDomain: "rxcountry-backoffice.firebaseapp.com",
    projectId: "rxcountry-backoffice",
    storageBucket: "rxcountry-backoffice.appspot.com",
    messagingSenderId: "150291031577",
    appId: "1:150291031577:web:0b17b2757cecf3f6a6ac88",
    measurementId: "G-NVG2EXRMDV",
    backendBaseUrl:
        "https://us-central1-rxcountry-backoffice.cloudfunctions.net/backendApp",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth, firebaseConfig };
