import firebase from 'firebase/compat/app';

// Add the Firebase products that you want to use
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBMxPncTwFOXkpvGR6Mc8UBdGDRPK-ljfo",
    authDomain: "ontapcorp-backoffice.firebaseapp.com",
    projectId: "ontapcorp-backoffice",
    storageBucket: "ontapcorp-backoffice.appspot.com",
    messagingSenderId: "613452523667",
    appId: "1:613452523667:web:d2b73db35c8aaa95ab0566",
    /* measurementId: "G-NVG2EXRMDV",
    backendBaseUrl:
        "https://us-central1-rxcountry-backoffice.cloudfunctions.net/backendApp", */
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth, firebaseConfig };
