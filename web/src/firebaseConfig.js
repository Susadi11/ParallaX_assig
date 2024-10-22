// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import auth for Firebase authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore if you're using it

// Your web app's Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyBl2l-r-3ZxBsJwSzj6I10jTrzdvdGlM4I",
    authDomain: "flutter-expense-tracker-f24d7.firebaseapp.com",
    projectId: "flutter-expense-tracker-f24d7",
    storageBucket: "flutter-expense-tracker-f24d7.appspot.com",
    messagingSenderId: "807232172291",
    appId: "1:807232172291:web:ca6ac9be2e2c72e52f3936",
    measurementId: "G-XEB8RB06NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app); // Firebase Authentication

// Initialize Firestore (optional if you're using Firestore)
const db = getFirestore(app);

export { auth, db }; // Export auth and db
