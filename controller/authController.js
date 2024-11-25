const Student = require('../model/studentModel');
const Email = require('../model/emailModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


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


    // Check if user exists : we do to this in the  emial clustor to check if mail is there are not
    const userExists = await Email.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User mail  already exists');
    }

    // Hash password salt for no of itterations to ensure delay it helps to crack slowly
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    // Creating studentAonymousId with email stored seperately
    const user = await Student.create({
        username,
        password: hashedPassword
    });

    //storing the email of user seperately
    const mail = await Email.create({
        email
    })



    //sending the result for confirmation
    if (user && mail) {
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

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
    });
};

module.exports = {
    registerStudent,
    loginStudent
};