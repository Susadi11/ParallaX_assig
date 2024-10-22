import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import Firebase config

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // After user signs up successfully in the SignUp.js
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Make a request to backend to create Firestore document
            await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email
                })
            });

            alert('User registered and profile created in Firestore!');
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <div className="max-w-sm mx-auto mt-10 p-5 bg-gray-100 rounded shadow">
            <h2 className="text-xl mb-4">Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="email"
                    className="mb-3 p-2 border rounded w-full"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="mb-3 p-2 border rounded w-full"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button className="bg-blue-500 text-white p-2 rounded w-full">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
