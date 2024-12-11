//currently not using this made as a experimental part

import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional CSS for styling

const Home = () => {
  return (
    <div className="homepage">
      <h1>Welcome to the Complaints Portal</h1>
      <nav>
        <ul>
          <li>
            <Link to="/history">View Complaint History</Link>
          </li>
          <li>
            <Link to="/unsolved">Unsolved Complaints</Link>
          </li>
          <li>
            <Link to="/resolved">Resolved Complaints</Link>
          </li>
          <li>
            <Link to="/rejected">Rejected Complaints</Link>
          </li>
          <li>
            <Link to="/create">Create a Complaint</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
