import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => (
  <div className="landing-container">
    <div className="content">
      <h1>Welcome to the Anonymous Grievance Portal</h1>
      <p className="description">Securely submit and manage grievances with ease.</p>
      <div className="links">
        <Link to="/login" className="landing-link">Login</Link>
        <Link to="/register" className="landing-link">Register</Link>
        <Link to="/flogin" className="landing-link">Faculty Login</Link>
      </div>
    </div>
  </div>
);

export default LandingPage;
