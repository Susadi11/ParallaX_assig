import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Use Navigate for redirection
import './App.css';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Make login the default route */}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
