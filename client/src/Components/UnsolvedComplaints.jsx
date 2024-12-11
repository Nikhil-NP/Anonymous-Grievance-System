import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api'; // Import the API call function

const UnsolvedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem('token'); // Get token from storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComplaints('unsolved', token); // Fetch unsolved complaints
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching unsolved complaints:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Unsolved Complaints</h2>
      {complaints.length > 0 ? (
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint.id}>{complaint.description}</li>
          ))}
        </ul>
      ) : (
        <p>No unsolved complaints available.</p>
      )}
    </div>
  );
};

export default UnsolvedComplaints;
