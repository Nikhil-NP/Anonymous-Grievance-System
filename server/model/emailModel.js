

const mongoose = require('mongoose');

//isolated email saving ensuring that we have anonymity(kinda like ultra anonimity)
const emailSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
  }, { timestamps: true });//remove the timestamp  i kept it as i am testing the code

  
  module.exports  = mongoose.model('Email', emailSchema);
  
