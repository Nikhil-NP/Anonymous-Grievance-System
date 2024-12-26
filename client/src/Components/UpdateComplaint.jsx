import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchComplaintById, updateComplaint } from "../services/api";
import './UpdateComplaint.css';


const UpdateComplaint = () => {
  const { id: _id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await fetchComplaintById(_id, token);//get the id of comlaint
        const complaintData = response.data;
        setComplaint(complaintData);
        setStatus(complaintData.status);
        setReply(complaintData.reply || "");
        setLoading(false);
      } catch (err) {
        setError("Error fetching complaint. Please try again.");
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [_id, token]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!status || !reply) {
      setError("Both status and reply are required.");
      return;
    }

    try {
      const updatedData = { status, reply };
      await updateComplaint(_id, updatedData, token);
      navigate("/pending");
    } catch (err) {
      setError("Failed to update complaint. Please try again.");
    }
  };

  if (loading) return <p>Loading complaint...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="update-complaint-wrapper">
      <h2>Update Complaint</h2>
      {error && <p className="error">{error}</p>}

      {complaint && (
        <div className="complaint-details">
          <p><strong>Title:</strong> {complaint.title}</p>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Date:</strong> {new Date(complaint.date).toLocaleDateString()}</p>
          <p><strong>Current Status:</strong> {complaint.status}</p>
          <p><strong>Reply:</strong> {complaint.reply || "No reply yet"}</p>
        </div>
      )}

      <form onSubmit={handleUpdate} className="update-form">
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reply</label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Enter reply to the complaint"
            className="form-textarea"
          />
        </div>

        <button type="submit" className="submit-button">Update Complaint</button>
      </form>
    </div>
  );
};

export default UpdateComplaint;
