import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import JourneyForm from './components/JourneyForm';
import ProfileEdit from './components/ProfileEdit';

function App() {
  const [theme, setTheme] = useState('day'); // 'day' or 'night'

  const toggleTheme = () => {
    setTheme(theme === 'day' ? 'night' : 'day');
  };

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Vehicle Reg</Link>
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
              Toggle {theme === 'day' ? 'Night' : 'Day'} Mode
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Log In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/journey">Plan Journey</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Edit Profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <div className="container mt-4">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/journey" element={<JourneyForm />} />
            <Route path="/profile" element={<ProfileEdit />} />
            <Route path="/" element={<h2>Welcome to Vehicle Registration Portal</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
