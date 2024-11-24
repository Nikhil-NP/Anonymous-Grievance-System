const mongoose = require('mongoose');
const ROLES = require('../config/roles');

//anonymous username for students 
const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.STUDENT,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Student', studentSchema);
