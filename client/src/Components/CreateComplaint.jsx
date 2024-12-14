import React, { useState, useEffect } from "react";
import { createComplaint } from "../services/api";
import { fetchAllFaculty } from "../services/api"; // Fetch faculty members
import { useNavigate } from "react-router-dom";
import './CreateComplaint.css'; // Import custom styles

const CreateComplaint = () => {
  const [title, setTitle] = useState(""); // Complaint title
  const [description, setDescription] = useState(""); // Complaint description
  const [facultyId, setFacultyId] = useState(""); // Selected faculty ID
  const [facultyList, setFacultyList] = useState([]); // List of faculty members
  const [success, setSuccess] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message
  const token = localStorage.getItem("token"); // Auth token
  const navigate = useNavigate();

  // Fetch the list of faculty members when the component mounts
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetchAllFaculty(token); // Fetch all faculty data
        setFacultyList(response.data); // Set the faculty list
      } catch (err) {
        setError("Error fetching faculty members. Please try again.");
      }
    };
    fetchFaculty();
  }, [token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !facultyId) {
      setError("All fields are required.");
      return;
    }

    try {
      const complaintData = { title, description, facultyId }; // Include faculty ID
      await createComplaint(complaintData, token); // Call the API to create a complaint
      setSuccess("Complaint created successfully!");
      setError("");
      alert('Complaint sent successfully!');
      navigate("/dashboard"); // Navigate to the complaints page after success
    } catch (err) {
      setError("Failed to create complaint.");
    }
  };

  return (
    <div className="create-complaint-wrapper">
      <header className="create-complaint-header">
        <h2>Create Complaint</h2>
      </header>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter complaint title"
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter complaint description"
            required
            className="textarea-field"
          />
        </div>
        <div className="form-group">
          <label>Faculty</label>
          <select
            value={facultyId}
            onChange={(e) => setFacultyId(e.target.value)}
            required
            className="select-field"
          >
            <option value="">Select a faculty</option>
            {facultyList.map((faculty) => (
              <option key={faculty.id} value={faculty._id}>
                {faculty.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Create Complaint</button>
      </form>
    </div>
  );
};

export default CreateComplaint;
