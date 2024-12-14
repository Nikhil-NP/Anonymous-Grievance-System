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
        getRejectedComplaints,
        getComplaintById,
        getAllFaculty} = require('../controller/complaintController');

// Routes

router.get('/history',protect,readComplaints) //api/complaints/history to see all the complaints by/to the student/faculty

    //student
    router.post('/', protect, createComplaint); // Student creates a complaint
    router.get('/unsolved', protect, getPendingComplaints); // student views  complaints that are unsolved yet
    router.get('/resolved', protect, getResolvedComplaints); // student views  complaints that are solved and accepted
    router.get('/rejected', protect, getRejectedComplaints); // student views  complaints that are solved and rejected
    router.get('/facultyId', protect, getAllFaculty);


    //faculty
    router.get('/pending', protect, getAssignedComplaints); // Faculty views assigned complaints
    router.get('/:id',getComplaintById ); 
    router.put('/pending/:id',protect,addressPendingComplaints); //review the complaint and address it 





module.exports = router;
