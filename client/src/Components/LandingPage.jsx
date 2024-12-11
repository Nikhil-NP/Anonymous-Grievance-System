import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => (
  <div>
    <h1>Welcome to the Complaint Portal</h1>
    <p>
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/flogin">faculty login</Link>
    </p>
  </div>
);

export default LandingPage;
