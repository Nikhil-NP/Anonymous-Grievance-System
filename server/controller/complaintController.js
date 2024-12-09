const asyncHandler = require('express-async-handler');
const Complaints = require('../model/complaintsModel');
const {validateResponse} = require('../services/geminiService')


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

    try {
        // Wait for the response from validateResponse
        const complain = `tite : ${title} , description :  ${description}`;
        const geminiResult = await validateResponse(complain);

        console.log("-----------------------------------", geminiResult);  // Now geminiResult will be true or false

        if (geminiResult === false) {
            res.status(400).json({ message: 'This is an NSFW complaint, rejected' });;
            //throw new Error('This is an NSFW complaint, rejected');
        } else {
            console.log("The complaint is safe for work, can be sent to the teacher");

            // Proceed with complaint creation if it's safe
            const complaint = await Complaints.create({
                title,
                description,
                to: facultyId,
                by: req.user.id
            });

            res.status(201).json(complaint);
        }
    } catch (error) {
        console.error('Error is:', error);
        res.status(500).json({ message: error.message });
    }
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



// @desc    student getting list of  complaints that are not solved yet
// @route   GET /api/complaint/pending
// @access  Private
const getPendingComplaints = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        res.status(403);
        throw new Error('Access denied not a student/admin');
    }
                                                            //the populate make the clusotr readble ensuring that we have nested info aabout sender insted of objectid
    const complaints = await Complaints.find({
             by: req.user.id,
             status: 'pending'
         })
        .populate('to','username')
        .select('-password');
    res.status(200).json(complaints);
});


//@desc faculty chose to reply and change status
//@route PUT /api/complaint/pending/:id
//@acces Private
const addressPendingComplaints = asyncHandler(async(req,res) => {

    const {status, reply} = req.body;
    const {id} = req.params;

    if(req.user.role !== 'faculty'){
        res.status(403);
        throw new Error('Acess denied you need to be a faculty/admin');
    }

    
    if (!reply || !status ) {
        res.status(400);
        throw new Error('reply and status both fields are required');
    }
    
    const compliantUpdated = await Complaints.findByIdAndUpdate(
        {_id :id },
        { $set: { status,reply } },
        { new: true }
    );
    if (!compliantUpdated) {
        res.status(404);
        throw new Error('couldnt update the complaint status or put a reply to it');
    }
    res.status(200).json(compliantUpdated);
    console.log(compliantUpdated);


});




// @desc    student getting list of  complaints that are  solved 
// @route   GET /api/complaint/resolved
// @access  Private
const getResolvedComplaints = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        res.status(403);
        throw new Error('Access denied not a student/admin');
    }
                                                            //the populate make the clusotr readble ensuring that we have nested info aabout sender insted of objectid
    const complaints = await Complaints.find({
             by: req.user.id,
             status: 'resolved'
         })
        .populate('to','username')
        .select('-password');
    res.status(200).json(complaints);
});


// @desc    student getting list of  complaints that are  rejected 
// @route   GET /api/complaint/resolved
// @access  Private
const getRejectedComplaints = asyncHandler(async (req, res) => {
    if (req.user.role !== 'student') {
        res.status(403);
        throw new Error('Access denied not a student/admin');
    }
                                                            //the populate make the clusotr readble ensuring that we have nested info aabout sender insted of objectid
    const complaints = await Complaints.find({
             by: req.user.id,
             status: 'rejected'
         })
        .populate('to','username')
        .select('-password');
    res.status(200).json(complaints);
});





module.exports = {  createComplaint, 
                    getAssignedComplaints,
                    readComplaints,
                    getPendingComplaints,
                    addressPendingComplaints,
                    getResolvedComplaints,
                    getRejectedComplaints };