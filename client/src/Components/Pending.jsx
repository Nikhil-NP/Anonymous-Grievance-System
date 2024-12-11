import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Pending Complaints</h2>
      {complaints.length > 0 ? (
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint.id}>
              <h4>{complaint.title}</h4>: {complaint.description}
              <p>Created At: {complaint.createdAt}</p>
              <p>Status: {complaint.status}</p>
              <Link to={`/pending/${complaint._id}`}>Update Complaint</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No pending complaints available.</p>
      )}
    </div>
  );
};

export default PendingComplaints;
