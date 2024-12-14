import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api'; // Import the API call function
import { Link } from 'react-router-dom';
import './RejectedComplaints.css';
const RejectedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem('token'); // Get token from storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComplaints('rejected', token); // Fetch rejected complaints
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching rejected complaints:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="resolved-complaints-wrapper">
      <Link to="/dashboard" className="back-link">Dashboard</Link>

      <h2>Rejected Complaints</h2>
      {complaints.length > 0 ? (
        <div className="complaints-container">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <h3 className="complaint-title">{complaint.title}</h3>
              <p className="complaint-description">{complaint.description}</p>
              <p className='darkred'><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Reply:</strong> {complaint.reply}</p>
              <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-complaints">No rejected complaints available.</p>
      )}
    </div>
  );
};

export default RejectedComplaints;
