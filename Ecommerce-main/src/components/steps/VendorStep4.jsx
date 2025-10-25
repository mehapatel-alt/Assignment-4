import React, { useState } from 'react';
import './CustomerStep1.css';

export default function VendorStep4({ formData, setFormData, prevStep, finish }) {
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFinish = () => {
    if (!formData.businessLicense || !formData.gstNumber || !formData.taxId) {
      setError('All fields are required');
      return;
    }
    setError('');
    finish();
  };

  return (
    <div className="customer-step">
      <h3>Vendor Step 4: Business Details</h3>
      <input
        name="businessLicense"
        placeholder="Business License Number"
        value={formData.businessLicense || ''}
        onChange={handleChange}
      />
      <input
        name="gstNumber"
        placeholder="GST Number"
        value={formData.gstNumber || ''}
        onChange={handleChange}
      />
      <input
        name="taxId"
        placeholder="Tax ID"
        value={formData.taxId || ''}
        onChange={handleChange}
      />
      {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
      <div className="buttons">
        {prevStep && <button onClick={prevStep}>Back</button>}
        <button onClick={handleFinish}>Finish</button>
      </div>
    </div>
  );
}
