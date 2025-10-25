import React from 'react';
import './CustomerStep1.css';

export default function VendorStep2({ formData, setFormData, nextStep, prevStep }) {
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="customer-step">
      <h3>Vendor Step 2: Address Info</h3>
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
        {prevStep && <button onClick={prevStep}>Back</button>}
        {nextStep && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
}
