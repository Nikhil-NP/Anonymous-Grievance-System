const Student = require('../model/studentModel');
const Email = require('../model/emailModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Faculty = require('../model/facultyModel');
const nodemailer = require('nodemailer');
//const bodyParser = require('body-parser'); declared in server.js not needed here just for reference and other feather i will in future



//temporary memeory
const pendingRegistrations = new Map();

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mygmail, // my Gmail address
        pass: process.env.appPasswordGoogle    // App Password from google
    }
});




// @desc    Register student
// @route   POST /api/auth/register
// @access  Public
const registerStudent = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;


    // Validate input
    if (!username || !password ||!email) {
        res.status(400);
        throw new Error('All fields are required while regiseter ');
    }


    // Check if user mail  exists : we do to this in the  emial clustor to check if mail is there are not
    const userExists = await Email.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User mail  already exists');
    }

    //check if username already exist in db:
    const userName = await Student.findOne({ username });
    if (userName) {
        res.status(400);
        throw new Error('User with this name  already exists');
    }



    //regex email validator to ensure the mail is in valid format
    //my mail for example : NikhilKumarPurohit.2022CMCIM400@atmemys.onmicrosoft.com  (fake)
    const regex = /^[A-Za-z]+\.[0-9]{4}[A-Za-z0-9]+@atmemys\.onmicrosoft\.com$/;
    if (!regex.test(email)){
        res.status(400)
        throw new Error('invalid student mail format');
    }



    // Hash password salt for no of itterations to ensure delay it helps to crack slowly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    //otp generation 
    const otp = Math.floor(100000 + Math.random() * 900000);
    pendingRegistrations.set(email, { username, hashedPassword, otp, createdAt: Date.now() });


    //mail config
    const mailOptions = {
        from: process.env.mygmail,
        to: email,
        subject: 'Verify Your Email',
        text: `Your OTP is ${otp}. It is valid for 5 minutes.B1 batch CSE ATME`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'OTP sent to email. Please verify to complete registration.' });
    } catch (err) {
        pendingRegistrations.delete(email);
        res.status(500);
        throw new Error('Failed to send OTP');
    }

});


// @desc    Verify OTP and complete registration
// @route   POST /api/auth/verify
// @access  Public
const verifyStudentOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        res.status(400);
        throw new Error('Email and OTP are required');
    }

    const pendingData = pendingRegistrations.get(email);

    if (!pendingData) {
        res.status(400);
        throw new Error('No pending registration found for this email');
    }

    const { username, hashedPassword, otp: savedOtp, createdAt } = pendingData;

    // Check OTP validity
    if (savedOtp !== parseInt(otp)) {
        res.status(400);
        throw new Error('Invalid OTP');
    }

    // Check OTP expiration (valid for 5 minutes)
    const now = Date.now();
    if (now - createdAt > 5 * 60 * 1000) {
        pendingRegistrations.delete(email);
        res.status(400);
        throw new Error('OTP expired');
    }

    // /Creating student anonymous  with email stored seperately after verification
    const user = await Student.create({
        username,
        password: hashedPassword
    });


    //storing the email in the email clustor
    const emailRecord = await Email.create({
        email
    });

    pendingRegistrations.delete(email); // Remove from temporary storage email 

    if (user && emailRecord) {
        res.status(201).json({ message: 'Registration complete',
        _id: user.id,
        name: user.username,
        role: user.role,
        token: generateToken(user._id)});
    } else {
        res.status(500);
        throw new Error('Failed to complete registration');
    }
});







// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginStudent =  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await Student.findOne({ username });

    //since we cant validate via mail we need to do via username
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200);
        res.json({
            _id: user.id,
            name: user.username,
            role: user.role,
            token: generateToken(user._id)
        });
        console.log("student login success: ",user);
    } else {
        res.status(401);
        throw new Error('Invalid credentials');
    }
});


//jwt contians the users id , the  jwt secret key password and expiry time
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30m',
    });
};








// @desc    Register Faculty
// @route   POST /api/auth/fregister
// @access  Public
const registerFaculty = asyncHandler( async (req, res) => {
    const { username, password } = req.body;


    // Validate input
    if (!username || !password ) {
        res.status(400);
        throw new Error('All fields are required while regisetering as faculty ');
    }


    // Check if user exists : we do to this in the  faculty  clustor to check if unique username is there are not
    const userExists = await Faculty.findOne({ username });
    if (userExists) {
        res.status(400);
        throw new Error('faculty  already exists');
    }

    // Hash password salt for no of itterations to ensure delay it helps to crack slowly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    // Creating FacultyAonymousId with email stored seperately
    const user = await Faculty.create({
        username,
        password: hashedPassword
    });



    //sending the result for confirmation
    if (user ) {
        res.status(201).json({
            _id: user.id,
            name: user.username,
            role: user.role,
            token: generateToken(user._id)
        });

        console.log(user);
    } else {
        res.status(400);
        throw new Error('Invalid user data or mail ');
    }
});












// @desc    Login faculty
// @route   POST /api/auth/flogin
// @access  Public
const loginFaculty =  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await Faculty.findOne({ username });

    //since we cant validate via mail we need to do via username
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200);
        res.json({
            _id: user.id,
            name: user.username,
            role: user.role,
            token: generateToken(user._id)
        });
        console.log("faculty login success: ",user);
    } else {
        res.status(401);
        throw new Error('Invalid credentials for faculty');
    }
});







module.exports = {
    registerStudent,
    loginStudent,
    loginFaculty,
    registerFaculty,
    verifyStudentOTP
};