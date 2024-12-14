import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api';
import { Link } from 'react-router-dom';
import './pending.css'; // Import the CSS file for styling

const PendingComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComplaints('pending', token);
        console.log(response.data);
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching pending complaints:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="pending-complaints-wrapper">
      <Link to="/facultydashboard" className="back-link">Back to Dashboard</Link>
      <h2>Pending Complaints</h2>
      <div className="complaints-container">
        {complaints.length > 0 ? (
          complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <h4 className="complaint-title">{complaint.title}</h4>
              <p className="complaint-description">{complaint.description}</p>
              <p><strong>Created At:</strong> {complaint.createdAt}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <Link to={`/pending/${complaint._id}`} className="update-link"><button className="update-button">Update Complaint</button></Link>
            </div>
          ))
        ) : (
          <p className="no-complaints">No pending complaints available.</p>
        )}
      </div>
    </div>
  );
};

export default PendingComplaints;
