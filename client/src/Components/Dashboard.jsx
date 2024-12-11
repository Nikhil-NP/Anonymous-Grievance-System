import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // Clear the token from localStorage
      localStorage.removeItem('token');
  
      // Redirect the user to the homepage
      navigate('/');
    };
  return (
  <div>
    <h1>Welcome to the Dashboard</h1>
    <nav>
      <ul>
        <li>
          <Link to="/unsolved">View Unsolved Complaints</Link>
        </li>
        <li>
          <Link to="/resolved">View Resolved Complaints</Link>
        </li>
        <li>
          <Link to="/rejected">View Rejected Complaints</Link>
        </li>
        <li>
          <Link to="/history">View  Complaints history</Link>
        </li>
        <li>
            {/* this triggers logout function on click */}
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
              Logout
            </button>
          </li>
      </ul>
    </nav>
  </div>
)};

export default Dashboard;
