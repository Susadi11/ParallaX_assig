const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Load Firebase Admin credentials from the JSON file path stored in the environment variable
const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://flutter-expense-tracker-f24d7.firebaseio.com" // Replace with your Firebase Database URL if you plan to use it
});

const db = admin.firestore(); // Initialize Firestore for user data management

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Example route: Fetch user data from Firebase Auth and Firestore
app.get('/api/user', async (req, res) => {
    const { uid } = req.query; // UID passed from the frontend (e.g., in query parameters)

    try {
        // Retrieve user information from Firebase Auth
        const userRecord = await admin.auth().getUser(uid);

        // Retrieve additional data from Firestore
        const userDoc = await db.collection('users').doc(uid).get();

        if (!userDoc.exists) {
            return res.status(404).send('User data not found');
        }

        const userData = userDoc.data();
        res.status(200).json({
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            additionalData: userData
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Error fetching user data');
    }
});

// Example route: Create user profile in Firestore after signup
app.post('/api/create-user', async (req, res) => {
    const { uid, email } = req.body;

    try {
        // Create a Firestore document for the new user
        await db.collection('users').doc(uid).set({
            email: email,
            createdAt: new Date(),
            profileComplete: false // Additional fields for the user's profile
        });

        res.status(201).send('User profile created');
    } catch (error) {
        console.error('Error creating user profile:', error);
        res.status(500).send('Error creating user profile');
    }
});

// Example route: Update user profile
app.put('/api/update-user', async (req, res) => {
    const { uid, profileData } = req.body;

    try {
        await db.collection('users').doc(uid).update(profileData);
        res.status(200).send('User profile updated');
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send('Error updating user profile');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
