const asyncHandler = require('express-async-handler');
const Complaints = require('../model/complaintsModel');


// @desc    create a complaint student
// @route   POST /api/complaint
// @access  Private
const createComplaint = asyncHandler(async (req, res) => {
    const { title, description, facultyId } = req.body;

    if (req.user.role !== 'student') {//the  jwt has bundled this detail with itself
        res.status(403);
        throw new Error('Access denied not a student');
    }

    if (!title || !description || !facultyId) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const complaint = await Complaints.create({
        
        title,
        description,
        to: facultyId,
        by: req.user.id
        //status: 'Pending',this is actully extra just kept it casue i have some tests in mind
    });

    res.status(201).json(complaint);
});

// @desc    view/read  complaint/s as a student
// @route   POST /api/complaint/history
// @access  Private
const readComplaints = asyncHandler(async(req,res)=>{//same as api/assigned but dynmic both student /faculty can access thier complaints
    if(req.user.role === 'faculty'){
        const complaints = await Complaints.find({ to: req.user.id })
            .populate('by', 'username')
            .select('-password');

        res.status(200).json(complaints);
    }
    else if(req.user.role === 'student'){
        const complaints = await Complaints.find({ by: req.user.id})
            .populate('to', 'username')
            .select('-password');

        res.status(200).json(complaints);
    }
})




// @desc    faculty getting a complaint assigned from a  student
// @route   GET /api/complaint/pending
// @access  Private
const getAssignedComplaints = asyncHandler(async (req, res) => {
    if (req.user.role !== 'faculty') {
        res.status(403);
        throw new Error('Access denied not a faculty/admin');
    }
                                                            //the populate make the clusotr readble ensuring that we have nested info aabout sender insted of objectid
    const complaints = await Complaints.find({
             to: req.user.id,
             status: 'pending'
         })
        .populate('by', 'username')
        .select('-password');
    res.status(200).json(complaints);
});


module.exports = { createComplaint, getAssignedComplaints,readComplaints };