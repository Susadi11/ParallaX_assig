import React, { useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase configuration
import { signOut } from 'firebase/auth';
import { useNavigate, useLocation } from 'react-router-dom'; // Use useNavigate and useLocation

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Use location to get passed user data
    const { uid, email } = location.state || {}; // Access uid and email passed from login or signup

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); // Redirect to login after logout
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        if (!uid) {
            navigate('/login'); // Redirect to login if no user data is present
        }
    }, [uid, navigate]);

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            {uid ? (
                <div>
                    <p>UID: {uid}</p>
                    <p>Email: {email}</p>
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
