import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import CustomerStep1 from './steps/CustomerStep1';
import CustomerStep2 from './steps/CustomerStep2';
import CustomerStep3 from './steps/CustomerStep3';
import VendorStep1 from './steps/VendorStep1';
import VendorStep2 from './steps/VendorStep2';
import VendorStep3 from './steps/VendorStep3';
import VendorStep4 from './steps/VendorStep4';
import './RegistrationPage.css';

export default function RegistrationPage() {
  const [role, setRole] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const customerSteps = [CustomerStep1, CustomerStep2, CustomerStep3];
  const vendorSteps = [VendorStep1, VendorStep2, VendorStep3, VendorStep4];

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFinish = () => {
    if(role === 'customer') {
      localStorage.setItem('customerData', JSON.stringify(formData));
    } else if(role === 'vendor') {
      localStorage.setItem('vendorData', JSON.stringify(formData));
    }
    alert('Registration Complete!');
    setRole('');
    setStep(1);
    setFormData({});
    navigate('/login');   // Navigation to login page - New Code
  };

  const StepComponent = role === 'customer'
    ? customerSteps[step - 1]
    : role === 'vendor'
    ? vendorSteps[step - 1]
    : null;

  return (
    <div className="register-bg">
      <div className="logo-container">
        <h1 className="logo-text">Ladyluxe</h1>
      </div>
      <div className="register-card">
        <button className="close-btn">×</button>
        <h2>Register As</h2>
        <select
          className="register-dropdown"
          value={role}
          onChange={e => {
            setRole(e.target.value);
            setStep(1);
            setFormData({});
          }}
        >
          <option value="">Select</option>
          <option value="vendor">Vendor</option>
          <option value="customer">Customer</option>
        </select>
        {StepComponent && (
          <>
            <div className="register-progress-bar">
              {Array.from({ length: role === 'customer' ? 3 : 4 }, (_, i) => i + 1).map(s => (
                <div
                  key={s}
                  className={`register-step${step === s ? " current" : step > s ? " completed" : ""}`}
                >
                  {s}
                </div>
              ))}
            </div>
            <StepComponent
              formData={formData}
              setFormData={setFormData}
              nextStep={step < (role === 'customer' ? 3 : 4) ? nextStep : undefined}
              prevStep={step > 1 ? prevStep : undefined}
              finish={step === (role === 'customer' ? 3 : 4) ? handleFinish : undefined}
            />
          </>
        )}
        <div className="member-text">
          Already a member?{" "}
          <span
            className="login-link"
            style={{ cursor: 'pointer', color: '#FFD700', fontWeight: 'bold' }}
            onClick={() => navigate('/login')}
          >
            Login Now
          </span>
        </div>
      </div>
    </div>
  );
}

