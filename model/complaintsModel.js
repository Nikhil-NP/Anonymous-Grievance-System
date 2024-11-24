const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    to: {//faculty info
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty', // Reference to the Faculty model
        required: true,
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,//getting the anonymous user 
        ref: 'Student', // Reference to the Student model
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    reply: {
        type: String, // Faculty's reply
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('Complaints', complaintSchema);