import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function ProfileEdit() {
  const [profile, setProfile] = useState({
    license: '',
    phone: '',
    // Assume vehicles is an array of vehicle objects.
    vehicles: [{ carType: '', carNumber: '', registrationCert: null }]
  });
  const [message, setMessage] = useState('');

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleVehicleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedVehicles = [...profile.vehicles];
    updatedVehicles[index][name] = name === 'registrationCert' ? files[0] : value;
    setProfile({ ...profile, vehicles: updatedVehicles });
  };

  const addVehicle = () => {
    setProfile({
      ...profile,
      vehicles: [...profile.vehicles, { carType: '', carNumber: '', registrationCert: null }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare form data to update the profile
    const dataToSend = new FormData();
    dataToSend.append('license', profile.license);
    dataToSend.append('contact', profile.phone);
    // Append vehicles if needed.
    // For simplicity, we assume one vehicle.
    axios.post('/api/profile', dataToSend)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div className="fade-in">
      <h3>Edit Profile</h3>
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="profileLicense">
          <Form.Label>License Number</Form.Label>
          <Form.Control type="text" name="license" placeholder="Enter license number" onChange={handleProfileChange} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="profilePhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phone" placeholder="Enter phone number" onChange={handleProfileChange} required />
        </Form.Group>
        <h5>Vehicles</h5>
        {profile.vehicles.map((vehicle, idx) => (
          <div key={idx} className="mb-3 p-3 border rounded">
            <Form.Group className="mb-2">
              <Form.Label>Car Type</Form.Label>
              <Form.Control type="text" name="carType" placeholder="Enter car type" onChange={(e) => handleVehicleChange(idx, e)} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Car Number</Form.Label>
              <Form.Control type="text" name="carNumber" placeholder="Enter car number" onChange={(e) => handleVehicleChange(idx, e)} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Registration Certificate</Form.Label>
              <Form.Control type="file" name="registrationCert" onChange={(e) => handleVehicleChange(idx, e)} required />
            </Form.Group>
          </div>
        ))}
        <Button variant="secondary" onClick={addVehicle} className="mb-3 btn-animate">
          Add Another Vehicle
        </Button>
        <br />
        <Button variant="primary" type="submit" className="btn-animate">
          Save Profile
        </Button>
      </Form>
    </div>
  );
}

export default ProfileEdit;

