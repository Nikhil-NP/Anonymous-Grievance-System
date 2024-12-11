import React, { useState } from 'react';
import { verifyStudentOTP } from '../services/api';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const VerifyOTP = () => {
  const location = useLocation(); //get the email from register page
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email'); // Get email from query parameter


  const navigate = useNavigate(); // to redirect to the login page
    const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyStudentOTP({ email, otp });
      setVerified(true);
      alert('Verification successful!');
      navigate(`/login`);
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message || 'An error occurred during verification.');
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  if (verified) {
    return <div>Registration Complete! Proceed to login.</div>;
  }

  return (
      <form onSubmit={handleVerify}>
        <input type="email" value={email} disabled />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    );
};

export default VerifyOTP;
