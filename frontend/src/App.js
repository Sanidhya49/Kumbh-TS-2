import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import JourneyForm from './components/JourneyForm';
import ProfileEdit from './components/ProfileEdit';

import Home from './pages/Home';
// import { VehicleAnimation } from './components/VehicleAnimation';

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/journey" element={<JourneyForm />} />
        <Route path="/profile" element={<ProfileEdit />} />
        <Route path="/" element={<h2>Welcome to Vehicle Registration Portal</h2>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
