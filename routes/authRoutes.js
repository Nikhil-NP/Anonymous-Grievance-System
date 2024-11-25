const express = require('express');

//creating a router using inbuild express method
const router = express.Router();

const {registerStudent,loginStudent} = require("../controller/authController");


//the gateway routes
router.post('/register',registerStudent);
router.post('/login',loginStudent);


module.exports = router;



