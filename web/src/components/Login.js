import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import Firebase config

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Logged in successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-5 bg-gray-100 rounded shadow">
            <h2 className="text-xl mb-4">Login</h2>
            <form onSubmit={handleLogin}>
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
                <button className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
            </form>
        </div>
    );
};

export default Login;
