import React, { useState } from 'react';
import { verifyStudentOTP } from '../services/api';
import { useLocation, useNavigate } from 'react-router-dom';
import './VerifyOTP.css';

const VerifyOTP = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email'); // Extract email from query parameter

  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyStudentOTP({ email, otp });
      alert('Verification successful!');
      navigate(`/login`); // Redirect to login page after success
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || 'An error occurred during verification.');
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2>Verify OTP</h2>
        <form onSubmit={handleVerify}>
          <input type="email" value={email} disabled className="verify-input" />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="verify-input"
          />
          <button type="submit" className="verify-button">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
