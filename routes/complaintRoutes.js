const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createComplaint, getAssignedComplaints } = require('../controller/complaintController');

// Routes
router.post('/', protect, createComplaint); // Student creates a complaint
router.get('/assigned', protect, getAssignedComplaints); // Faculty views assigned complaints

module.exports = router;
