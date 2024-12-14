import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api'; // Import the API call function
import { Link } from 'react-router-dom';
import './ResolvedComplaints.css'; // Import the custom CSS styles

const ResolvedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem('token'); // Get token from storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComplaints('resolved', token); // Fetch resolved complaints
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching resolved complaints:', error.message);
      }
    };

    fetchData();
  }, [token]);

  // Function to format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="resolved-complaints-wrapper">
      <Link to="/dashboard" className="back-link">Back to Dashboard</Link>

      <h2>Resolved Complaints</h2>
      {complaints.length > 0 ? (
        <div className="complaints-container">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <h3 className="complaint-title">{complaint.title}</h3>
              <p className="complaint-description">{complaint.description}</p>
              <p className='green'><strong>Status:</strong> {complaint.status}</p>
              <p ><strong>Reply:</strong> {complaint.reply}</p>
              <p><strong>Date:</strong> {formatDate(complaint.createdAt)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-complaints">No resolved complaints available.</p>
      )}
    </div>
  );
};

export default ResolvedComplaints;
