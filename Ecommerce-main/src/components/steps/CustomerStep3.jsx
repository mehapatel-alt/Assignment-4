import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import './CustomerStep1.css';

export default function CustomerStep3({ formData, setFormData, prevStep, finish }) {
  const [error, setError] = useState('');
  //const navigate = useNavigate();

  // All fields change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Finish button validation and save credentials
  const handleFinish = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields required");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError('');

    finish(); // registration complete logic

    // Save credentials to localStorage for login use
    localStorage.setItem('registeredEmail', formData.email);
    localStorage.setItem('registeredPassword', formData.password);
    finish();   // adding new
    // Redirect to login page
    //navigate('/login');
  };

  return (
    <div className="customer-step">
      <h3>Step 3: Login Info</h3>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email || ''}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password || ''}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword || ''}
        onChange={handleChange}
      />
      {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
      <div className="buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={handleFinish}>Finish</button>
      </div>
    </div>
  );
}
