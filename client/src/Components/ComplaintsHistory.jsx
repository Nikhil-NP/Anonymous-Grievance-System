import React, { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api'; // Import the API call function

const ComplaintsHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const token = localStorage.getItem('token'); // Get token from storage

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComplaints('history', token); // Fetch  complaints history
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching unsolved complaints:', error.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h2> Complaints history </h2>
      {complaints.length > 0 ? (
        <ol>
          {complaints.map((complaint) => (
            <li key={complaint.id}> 
            <h4>{complaint.title}</h4>:{complaint.description} 
             {complaint.createdAt}<p>faculty</p>: {complaint.to} 
              <p>status</p>: {complaint.status}
              <p>date</p>: {complaint.createdAt} 
                 </li>
          ))}
        </ol>
      ) : (
        <p>No history of  complaints available.</p>
      )}
    </div>
  );
};

export default ComplaintsHistory;
