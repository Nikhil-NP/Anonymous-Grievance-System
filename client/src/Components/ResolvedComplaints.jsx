import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api';

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

  return (
    <div>
      <h2>Resolved Complaints</h2>
      {complaints.length > 0 ? (
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint.id}>{complaint.description}</li>
          ))}
        </ul>
      ) : (
        <p>No resolved complaints available.</p>
      )}
    </div>
  );
};

export default ResolvedComplaints;
