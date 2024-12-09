const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {  
        createComplaint,
        getAssignedComplaints,
        readComplaints ,
        getPendingComplaints,
        addressPendingComplaints,
        getResolvedComplaints,
        getRejectedComplaints} = require('../controller/complaintController');

// Routes

router.get('/history',protect,readComplaints) //api/complaints/history to see all the complaints by/to the student/faculty

    //student
    router.post('/', protect, createComplaint); // Student creates a complaint
    router.get('/unsolved', protect, getPendingComplaints); // student views  complaints that are unsolved yet
    router.get('/resolved', protect, getResolvedComplaints); // student views  complaints that are solved and accepted
    router.get('/rejected', protect, getRejectedComplaints); // student views  complaints that are solved and rejected



    //faculty
    router.get('/pending', protect, getAssignedComplaints); // Faculty views assigned complaints
    router.put('/pending/:id',protect,addressPendingComplaints); //review the complaint and address it 




module.exports = router;
