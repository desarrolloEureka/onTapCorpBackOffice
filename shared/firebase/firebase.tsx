import firebase from 'firebase/compat/app';

// Add the Firebase products that you want to use
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBsybfHvoAj3Bvtzu_WwFq3fj9bWOYVziM",
    authDomain: "onetapcorp-d0146.firebaseapp.com",
    projectId: "onetapcorp-d0146",
    storageBucket: "onetapcorp-d0146.appspot.com",
    messagingSenderId: "828170350312",
    appId: "1:828170350312:web:e023c1b6a14e680233235d",
    measurementId: "G-ES4RD6WMNW"
    /* measurementId: "G-NVG2EXRMDV",
    backendBaseUrl:
        "https://us-central1-rxcountry-backoffice.cloudfunctions.net/backendApp", */
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth, firebaseConfig };
