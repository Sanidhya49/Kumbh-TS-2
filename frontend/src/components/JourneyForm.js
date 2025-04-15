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
    license: '',
    timeSlot: '' // Added time slot field
  });
  const [message, setMessage] = useState('');
  const [slotAvailability, setSlotAvailability] = useState({});
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Try to load the license from localStorage on mount
  useEffect(() => {
    const storedLicense = localStorage.getItem("license");
    if (storedLicense) {
      setJourney(prev => ({ ...prev, license: storedLicense }));
    }
  }, []);

  // Time slots - 6 hour intervals throughout the day
  const timeSlots = [
    { label: "00:00 - 06:00", value: "slot1" },
    { label: "06:00 - 12:00", value: "slot2" },
    { label: "12:00 - 18:00", value: "slot3" },
    { label: "18:00 - 00:00", value: "slot4" }
  ];

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
    
    // If date or destination changes, check slot availability
    if ((name === 'startDate' || name === 'destination') && journey.startDate && journey.destination) {
      checkSlotAvailability();
    }
  };

  // Function to check slot availability
  const checkSlotAvailability = () => {
    setSlotsLoading(true);
    axios.get(`/api/slot-availability?date=${journey.startDate}&destination=${journey.destination}`)
      .then(response => {
        setSlotAvailability(response.data.availability);
        setSlotsLoading(false);
      })
      .catch(error => {
        console.error("Error checking slot availability:", error);
        setSlotsLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure the license is part of the journey data
    if (!journey.license) {
      alert("User license not found. Please log in again.");
      return;
    }
    
    // Check if the selected slot is full before submitting
    if (slotAvailability[journey.timeSlot] >= 5000) {
      setMessage("Selected time slot is full. Please choose another time slot.");
      return;
    }
    
    axios.post('/api/journey', journey)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage(error.response?.data?.message || "An error occurred");
      });
  };

  // Function to render time slot options with availability
  const renderTimeSlotOptions = () => {
    return timeSlots.map((slot, idx) => {
      const count = slotAvailability[slot.value] || 0;
      const isFull = count >= 5000;
      return (
        <option 
          key={idx} 
          value={slot.value} 
          disabled={isFull}
        >
          {slot.label} {isFull ? "(Full)" : `(${count}/5000 vehicles)`}
        </option>
      );
    });
  };

  return (
    <div className="signup-container fade-in">
      <div className="signup-form-wrapper">
        <h3>Plan Your Journey</h3>
        {message && <Alert variant={message.includes("full") ? "warning" : "success"}>{message}</Alert>}
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
          
          {/* Time Slot Selection */}
          <Form.Group className="mb-3 form-group" controlId="journeyTimeSlot">
            <Form.Label>Time Slot</Form.Label>
            <Form.Select 
              name="timeSlot" 
              onChange={handleChange} 
              required
              disabled={!journey.startDate || !journey.destination || slotsLoading}
            >
              <option value="">
                {slotsLoading ? "Loading slots..." : "Select time slot"}
              </option>
              {journey.startDate && journey.destination && renderTimeSlotOptions()}
            </Form.Select>
            {(!journey.startDate || !journey.destination) && 
              <Form.Text className="text-muted">
                Please select destination and start date first
              </Form.Text>
            }
          </Form.Group>
          
          <Form.Group className="mb-3 form-group" controlId="journeyPassengers">
            <Form.Label>Number of Passengers</Form.Label>
            <Form.Control type="number" name="passengers" min="1" onChange={handleChange} required />
          </Form.Group>
          <Button 
            variant="primary" 
            type="submit" 
            className="btn-submit btn-animate"
            disabled={slotsLoading}
          >
            Submit Journey
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default JourneyForm;