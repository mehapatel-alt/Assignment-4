import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');  // Default role chosen
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    let storedData = null;
    if (role === 'customer') {
      storedData = JSON.parse(localStorage.getItem('customerData'));
    } else if (role === 'vendor') {
      storedData = JSON.parse(localStorage.getItem('vendorData'));
    }

    if (!storedData) {
      setError('No registered data found. Please register first.');
      return;
    }

    if (
      email.trim().toLowerCase() === storedData.email.trim().toLowerCase() &&
      password === storedData.password
    ) {
      setError('');
      alert(`${role} login successful!`);
      
      if (role === 'customer') {
        localStorage.setItem('isCustomerLoggedIn', 'true');
        navigate('/customer-dashboard');
      } else if (role === 'vendor') {
        localStorage.setItem('isCustomerLoggedIn', 'false');
        localStorage.setItem('isVendorLoggedIn', 'true');
        navigate('/vendor-dashboard');
      }
      
    } else {
      setError('Invalid email or password');
    }
  };


  return (
    <div className="page-container">
      <div className="logo-container">
        <h1 className="logo-text">Ladyluxe</h1>
      </div>
      <div className="login-box-overlay">
        <div className="login-box">
          <h3>EXISTING MEMBER</h3>
          <div className="role-select">
            <label>
              <input
                type="radio"
                value="customer"
                checked={role === 'customer'}
                onChange={e => setRole(e.target.value)}
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                value="vendor"
                checked={role === 'vendor'}
                onChange={e => setRole(e.target.value)}
              />
              Vendor
            </label>
          </div>
          <div className="input-group">
            <span role="img" aria-label="email">📧</span>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="off"
              name="emailField"
            />
          </div>
          <div className="input-group">
            <span role="img" aria-label="password">🔒</span>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="off"
              name="passwordField"
            />
          </div>
          {error && <div style={{color: 'red', marginTop: '8px'}}>{error}</div>}
          <button className="continue-btn" onClick={handleLogin}>Continue →</button>
          <div className="or-text">OR</div>
          <div className="social-login">
            <button className="circle-btn">G</button>
            <button className="circle-btn">f</button>
            <button className="circle-btn">📱</button>
          </div>
          <div className="register-text">
            Don’t have account? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: '#FFD700', fontWeight: 'bold' }}>Register Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}


