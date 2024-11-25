const express = require('express');

//creating a router using inbuild express method
const router = express.Router();

//importing the controller
const {registerStudent,loginStudent,loginFaculty,registerFaculty} = require("../controller/authController");


//the gateway routes for student
router.post('/register',registerStudent);
router.post('/login',loginStudent);

//gateway route for faculty
router.post('/fregister',registerFaculty);
router.post('/flogin',loginFaculty);


module.exports = router;



