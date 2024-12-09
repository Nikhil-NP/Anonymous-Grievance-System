const express = require('express');

//creating a router using inbuild express method
const router = express.Router();

//importing the controller
const {registerStudent,loginStudent,loginFaculty,registerFaculty,verifyStudentOTP} = require("../controller/authController");


//the gateway routes for student
router.post('/register',registerStudent);//otp generation and data saved in tempory memeory
//verification before registration
router.post('/verify', verifyStudentOTP); // Verify OTP and complete registration
router.post('/login',loginStudent);

//gateway route for faculty
router.post('/fregister',registerFaculty);
router.post('/flogin',loginFaculty);

//here after login/register we generate a jwt that we will use to verify by authmiddleware to do acces  compalintRoutes.js
module.exports = router;