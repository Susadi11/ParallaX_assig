import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Routes and Route for v6
import './App.css';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Use element and pass JSX instead of component */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<p>Home Page. Please <a href="/login">Login</a> or <a href="/signup">Sign Up</a>.</p>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
