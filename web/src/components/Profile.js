import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase configuration
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    const response = await fetch(`/api/user?uid=${user.uid}`);
                    const userData = await response.json();
                    setUser(userData); // Update the state with user data from Firestore
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Use navigate instead of history.push
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            {user ? (
                <div>
                    <p>Email: {user.email}</p>
                    <button className="bg-red-500 text-white p-2 rounded" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default Profile;
