// here we verify the user(student/faculty) is valid 


const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Student = require('../model/studentModel');
const Faculty = require('../model/facultyModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (//checking if the authorization.token is present with the  bearer
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //getting only the vaid jwt token 
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            //we are excluding the password even in authentication part and sending the other details
            req.user = await Student.findById(decoded.id).select('-password') || await Faculty.findById(decoded.id).select('-password');
            console.log(req.user);
            next();

        } catch (error) {

            console.error(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
