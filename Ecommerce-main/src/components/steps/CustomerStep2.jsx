import React from 'react';
import './CustomerStep1.css';

export default function CustomerStep2({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="customer-step">
      <h3>Step 2: Contact Info</h3>
      <input
        type="text"
        name="Address"
        placeholder="Address"
        value={formData.Address || ''}
        onChange={handleChange}
      />
      <input
        type="text"
        name="State"
        placeholder="State"
        value={formData.State || ''}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone || ''}
        onChange={handleChange}
      />
      <div className="buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep} disabled={!formData.phone || !formData.phone}>
          Next
        </button>
      </div>
    </div>
  );
}

