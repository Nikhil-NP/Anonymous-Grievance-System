import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FacultyDashboard.css'; // Import the CSS file for styling

const FacultyDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Redirect the user to the homepage
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Faculty Dashboard</h1>
      </header>
      <nav className="dashboard-nav">
        <ul className="nav-list">
          <li>
            <Link to="/history" className="nav-link">View Complaints History</Link>
          </li>
          <li>
            <Link to="/pending" className="nav-link">View Pending Complaints</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FacultyDashboard;
