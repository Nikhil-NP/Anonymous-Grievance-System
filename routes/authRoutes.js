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

//here after login/register we generate a jwt that we will use to verify by authmiddleware to do acces  compalintRoutes.js
module.exports = router;