import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [loginData, setLoginData] = useState({ license: '', contact: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', loginData)
      .then(response => {
        // Save the license in localStorage for later use
        localStorage.setItem("license", loginData.license);
        setMessage(response.data.message);
        // Redirect to journey planning after a brief delay
        setTimeout(() => {
          navigate('/journey');
        }, 1000);
      })
      .catch(error => {
        setMessage(error.response.data.message);
      });
  };
  
  return (
    <div className="fade-in">
      <h3>Driver Login</h3>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginLicense">
          <Form.Label>License Number</Form.Label>
          <Form.Control 
            type="text" 
            name="license" 
            placeholder="Enter license number" 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginContact">
          <Form.Label>Registered Contact Number</Form.Label>
          <Form.Control 
            type="text" 
            name="contact" 
            placeholder="Enter contact number" 
            onChange={handleChange} 
            required 
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn-animate">
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
