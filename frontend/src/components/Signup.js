import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext'; // Import if using the theme context

function Signup() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    aadhaar: '',
    license: '',
    carType: '',
    carNumber: '',
    registrationCert: null,
    vehicleImage: null,
  });
  
  const { theme } = useTheme();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data as FormData for file uploads.
    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    axios.post('/api/signup', dataToSend)
      .then(response => {
        console.log(response.data);
        setShowModal(true);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="signup-container fade-in">
      <div className="signup-form-wrapper">
        <h3>Driver Sign Up</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 form-group" controlId="formName">
            <Form.Label>Driver Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              placeholder="Enter your name" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          
          <Form.Group className="mb-3 form-group" controlId="formContact">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control 
              type="text" 
              name="contact" 
              placeholder="Enter contact number" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              name="email" 
              placeholder="Enter email" 
              onChange={handleChange} 
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formAadhaar">
            <Form.Label>Aadhaar Number</Form.Label>
            <Form.Control 
              type="text" 
              name="aadhaar" 
              placeholder="Enter Aadhaar number" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formLicense">
            <Form.Label>License Number</Form.Label>
            <Form.Control 
              type="text" 
              name="license" 
              placeholder="Enter license number" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formCarType">
            <Form.Label>Car Type</Form.Label>
            <Form.Select 
              name="carType" 
              onChange={handleChange} 
              required
            >
              <option value="">Select vehicle</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Bike">Bike</option>
              <option value="Truck">Truck</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formCarNumber">
            <Form.Label>Car Number Plate</Form.Label>
            <Form.Control 
              type="text" 
              name="carNumber" 
              placeholder="Enter car number plate" 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formRegistrationCert">
            <Form.Label>Registration Certificate</Form.Label>
            <div className="file-input-container">
              <label className="file-input-label">
                Choose file
                <Form.Control 
                  className="file-input"
                  type="file" 
                  name="registrationCert" 
                  onChange={handleChange} 
                  required 
                />
              </label>
              <span className="file-name">
                {formData.registrationCert ? formData.registrationCert.name : 'No file chosen'}
              </span>
            </div>
          </Form.Group>

          <Form.Group className="mb-3 form-group" controlId="formVehicleImage">
            <Form.Label>Vehicle Image</Form.Label>
            <div className="file-input-container">
              <label className="file-input-label">
                Choose file
                <Form.Control 
                  className="file-input"
                  type="file" 
                  name="vehicleImage" 
                  onChange={handleChange} 
                  required 
                />
              </label>
              <span className="file-name">
                {formData.vehicleImage ? formData.vehicleImage.name : 'No file chosen'}
              </span>
            </div>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="btn-submit btn-animate"
          >
            Sign Up
          </Button>
        </Form>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Registration Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your registration has been completed successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Signup;