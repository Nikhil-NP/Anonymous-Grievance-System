
const express = require("express");
const dotenv = require("dotenv").config();//this needs to be at the top cause .env all are deoendent on it

const connectDb = require("./config/dbConnection");
const {errorHandler} = require("./middleware/errorHandler");


//.env path setup
const port = process.env.PORT || 5000;



//connecting to the db: ags
connectDb();


const app = express();//creating the app


app.use(express.json()); //this allow to parse data like a parser
app.use(express.urlencoded({ extended: false })); //parses the HTML to extract json{key:value}


// Routes 
app.use('/api/auth', require('./routes/authRoutes'));


//errorHandler middleware
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`server running  on port ${port}`);
});

