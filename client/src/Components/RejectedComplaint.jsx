import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api'; // Import the API call function

const RejectedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem('token'); // Get token from storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComplaints('rejected', token); // Fetch rejected complaints
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching unsolved complaints:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2>rejected Complaints</h2>
      {complaints.length > 0 ? (
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint.id}>{complaint.description}</li>
          ))}
        </ul>
      ) : (
        <p>No rejected complaints available.</p>
      )}
    </div>
  );
};

export default RejectedComplaints;
