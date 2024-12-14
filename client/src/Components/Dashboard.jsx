import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
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
        <h1>Student Dashboard</h1>
      </header>
      <nav className="dashboard-nav">
        <ul className="nav-list">
          <li>
            <Link to="/create" className="nav-link">Create New Complaint</Link>
          </li>
          <li>
            <Link to="/unsolved" className="nav-link">View Unsolved Complaints</Link>
          </li>
          <li>
            <Link to="/resolved" className="nav-link">View Resolved Complaints</Link>
          </li>
          <li>
            <Link to="/rejected" className="nav-link">View Rejected Complaints</Link>
          </li>
          <li>
            <Link to="/history" className="nav-link">View Complaints History</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
