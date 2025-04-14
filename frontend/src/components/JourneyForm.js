import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function JourneyForm() {
  const [journey, setJourney] = useState({
    destination: '',
    fromState: '',
    startDate: '',
    endDate: '',
    passengers: '',
    license: ''
  });
  const [message, setMessage] = useState('');

  // Try to load the license from localStorage on mount
  useEffect(() => {
    const storedLicense = localStorage.getItem("license");
    if (storedLicense) {
      setJourney(prev => ({ ...prev, license: storedLicense }));
    }
  }, []);

  const destinations = [
    { label: "Kumbh Mela (Prayagraj)", value: "Prayagraj" },
    { label: "Badrinath Temple", value: "Badrinath" },
    { label: "Kedarnath Temple", value: "Kedarnath" },
    { label: "Jagannath Rath Yatra (Puri)", value: "Puri" },
    { label: "Tirupati Balaji Temple", value: "Tirupati" },
    { label: "Shirdi Sai Baba Temple", value: "Shirdi" }
  ];

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJourney({ ...journey, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure the license is part of the journey data
    if (!journey.license) {
      alert("User license not found. Please log in again.");
      return;
    }
    axios.post('/api/journey', journey)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="signup-container fade-in">
      <div className="signup-form-wrapper">
        <h3>Plan Your Journey</h3>
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* If license is not set via localStorage, show an input field */}
          {!journey.license && (
            <Form.Group className="mb-3 form-group" controlId="journeyLicense">
              <Form.Label>Your License Number</Form.Label>
              <Form.Control 
                type="text" 
                name="license" 
                placeholder="Enter your license number" 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3 form-group" controlId="journeyDestination">
            <Form.Label>Where to Go</Form.Label>
            <Form.Select name="destination" onChange={handleChange} required>
              <option value="">Select destination</option>
              {destinations.map((dest, idx) => (
                <option key={idx} value={dest.value}>{dest.label}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 form-group" controlId="journeyFromState">
            <Form.Label>From Where (State)</Form.Label>
            <Form.Select name="fromState" onChange={handleChange} required>
              <option value="">Select state</option>
              {states.map((state, idx) => (
                <option key={idx} value={state}>{state}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 form-group" controlId="journeyStartDate">
            <Form.Label>Journey Start Date</Form.Label>
            <Form.Control type="date" name="startDate" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3 form-group" controlId="journeyEndDate">
            <Form.Label>Journey End Date</Form.Label>
            <Form.Control type="date" name="endDate" onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3 form-group" controlId="journeyPassengers">
            <Form.Label>Number of Passengers</Form.Label>
            <Form.Control type="number" name="passengers" min="1" onChange={handleChange} required />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            className="btn-submit btn-animate"
          >
            Submit Journey
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default JourneyForm;