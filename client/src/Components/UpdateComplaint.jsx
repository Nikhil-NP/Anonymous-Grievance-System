import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { fetchComplaints,updateComplaint } from '../services/api'; // Import the API call function

const UpdateComplaint = () => {
  const { id: _id } = useParams(); // Get complaint ID from the URL
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState('');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await fetchComplaints('pending', token); // Fetch complaints
        const complaintData = response.data.find((complaint) => complaint.id === parseInt(_id));
        setComplaint(complaintData); // Set fetched complaint data
      } catch (err) {
        setError('Error fetching complaint.');
      }
    };
    fetchComplaint();
  }, [_id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!status || !reply) {
      setError('Both status and reply are required.');
      return;
    }

    try {
      const updatedData = { status, reply };
      await updateComplaint(_id, updatedData, token); // Update the complaint
      navigate('/unsolved'); // Navigate back to pending complaints page
    } catch (err) {
      setError('Failed to update complaint. Please try again.');
    }
  };

  if (!complaint) return <p>Loading complaint...</p>;

  return (
    <div>
      <h2>Update Complaint</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label>Reply</label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Enter reply to the complaint"
          />
        </div>
        <button type="submit">Update Complaint</button>
      </form>
    </div>
  );
};

export default UpdateComplaint;
