import React, { useState } from 'react';
import './CustomerStep1.css';

export default function CustomerStep1({ formData, setFormData, nextStep }) {
  const [error, setError] = useState('');

  const validateAndNext = () => {
    if (!formData.fullName || !formData.gender || !formData.dob) {
      setError('Please fill all required fields');
      return;
    }
    if (formData.fullName.length < 8 || formData.fullName.length > 20) {
      setError('Name must be between 8 and 20 characters');
      return;
    }
    setError('');
    nextStep();
  };

  return (
    <div className="customer-step">
      <h3>Step 1: Personal Info</h3>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName || ''}
        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
      />
      <select
        name="gender"
        value={formData.gender || ''}
        onChange={e => setFormData({ ...formData, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
      <input
        type="date"
        name="dob"
        value={formData.dob || ''}
        onChange={e => setFormData({ ...formData, dob: e.target.value })}
      />
      {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
      <button className="next-btn" onClick={validateAndNext}>
        Next
      </button>
    </div>
  );
}
