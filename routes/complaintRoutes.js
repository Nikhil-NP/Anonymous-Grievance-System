const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createComplaint, getAssignedComplaints,readComplaints } = require('../controller/complaintController');

// Routes
router.post('/', protect, createComplaint); // Student creates a complaint
router.get('/pending', protect, getAssignedComplaints); // Faculty views assigned complaints
router.get('/history',protect,readComplaints) //api/complaints/history to see all the complaints by/to the student/faculty


module.exports = router;
