

const mongoose = require('mongoose');

//isolated email saving ensuring that we have anonymity(kinda like ultra anonimity)
const emailSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
  }, { timestamps: true });
  
  module.exports  = mongoose.model('Email', emailSchema);
  
