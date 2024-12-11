import React, { useState } from 'react';
import { registerStudent } from '../services/api';
import { Link } from 'react-router-dom'; //not using planning to use the below useNavigate
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '',password: '' });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    // Frontend validation to reduce server 
    if (!formData.username || !formData.email || !formData.password) {
      alert('All fields are required');
      return;
    }

    const regex = /^[A-Za-z]+\.[0-9]{4}[A-Za-z0-9]+@atmemys\.onmicrosoft\.com$/;
    if (!regex.test(formData.email)) {
      alert('Invalid student email format');
      return;
    }
      e.preventDefault();
      try {
        await registerStudent(formData);
        setOtpSent(true);
        alert('OTP sent to your email/outlook!');
         // Redirect to `/verify` with email as query parameter
        navigate(`/verify?email=${encodeURIComponent(formData.email)}`);
        } catch (err) {
          if (err.response) {
            // Log the full response for debugging
            console.error('Error Response:', err.response.data);
      
            // Display the error message returned by the backend
            alert(err.response.data.message || 'An error occurred.');
          }
          else {
            // For other errors (like network issues)
            console.error('Error:', err.message);
            alert('An unexpected error occurred. Please try again.');
          }
        };

  if (otpSent) {
    return (
        <Link to="/verify">Verify with OTP</Link>);
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
