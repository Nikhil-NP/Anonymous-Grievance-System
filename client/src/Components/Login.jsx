import React, { useState } from 'react';
import { loginStudent } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(''); // To handle error messages
  const navigate = useNavigate(); // To navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Frontend validation
    if (!formData.username || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      // Call the login API
      const response = await loginStudent(formData);

      // Store the token in localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        // Display the error message from the backend
        setError(err.response.data.message || 'An error occurred.');
      } else {
        // Handle other errors (e.g., network issues)
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Show error if any */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
