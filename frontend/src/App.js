import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import JourneyForm from './components/JourneyForm';
import ProfileEdit from './components/ProfileEdit';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/journey" element={<JourneyForm />} />
            <Route path="/profile" element={<ProfileEdit />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;