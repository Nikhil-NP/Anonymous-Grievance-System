const mongoose = require('mongoose');
const ROLES = require('../config/roles');


const facultySchema = new mongoose.Schema({
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
      default: ROLES.FACULTY,
  }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Faculty', facultySchema);
  

  