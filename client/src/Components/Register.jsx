import React, { useState } from 'react';
import { registerStudent } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(''); // To handle error messages
  const [otpSent, setOtpSent] = useState(false); // OTP sent state
  const navigate = useNavigate(); // To navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Frontend validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    const regex = /^[A-Za-z]+\.[0-9]{4}[A-Za-z0-9]+@atmemys\.onmicrosoft\.com$/;
    if (!regex.test(formData.email)) {
      setError('Invalid student email format');
      return;
    }

    try {
      // Call the register API
      await registerStudent(formData);
      setOtpSent(true); // Set OTP sent flag
      alert('OTP sent to your email/outlook!');
      navigate(`/verify?email=${encodeURIComponent(formData.email)}`); // Redirect to verification page
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'An error occurred.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (otpSent) {
    return (
      <div className="register-container">
        <div className="register-card">
          <h2>Verification</h2>
          <p>OTP has been sent to your email. Please verify!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>} {/* Show error if any */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="register-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
