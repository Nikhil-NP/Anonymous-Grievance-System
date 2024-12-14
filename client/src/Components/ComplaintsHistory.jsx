import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api'; // Import the API call function


const ComplaintsHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem('token'); // Get token from storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComplaints('history', token); // Fetch complaints history
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints history:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="resolved-complaints-wrapper">
      <h2>Complaints History</h2>
      {complaints.length > 0 ? (
        <div className="complaints-container">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <h4 className="complaint-title">{complaint.title}</h4>
              <p className="complaint-description">{complaint.description}</p>
              <p><strong>Status:</strong> {complaint.status}</p>
              <p><strong>Date:</strong> {new Date(complaint.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-complaints">No history of complaints available.</p>
      )}
    </div>
  );
};

export default ComplaintsHistory;
