import React, { useState } from 'react';
import { loginFaculty } from '../services/api';
import { useNavigate } from 'react-router-dom';

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
      const response = await loginFaculty(formData);

      // Store the token in localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Navigate to the dashboard
      navigate('/FacultyDashboard');
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
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit"> faculty Login</button>
      </form>
    </div>
  );
};

export default Login;
