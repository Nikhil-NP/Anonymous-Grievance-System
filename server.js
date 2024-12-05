
const express = require("express");
const dotenv = require("dotenv").config();//this needs to be at the top cause .env all are dependent on it

const connectDb = require("./config/dbConnection");
const {errorHandler} = require("./middleware/errorHandler");


//.env path setup
const port = process.env.PORT || 5000;



//connecting to the db: ags
connectDb();


const app = express();//creating the app


app.use(express.json()); //this allow to parse data like a parser
app.use(express.urlencoded({ extended: false })); //parses the HTML to extract json{key:value}


//body parser for email format verifier
const bodyParser = require('body-parser');
app.use(bodyParser.json())



// Auth Routes 
app.use('/api/auth', require('./routes/authRoutes'));

//Complaint Routes
app.use('/api/complaints', require('./routes/complaintRoutes'));

//errorHandler middleware
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server running  on port ${port}`);
});

