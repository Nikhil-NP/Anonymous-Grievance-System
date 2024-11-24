
const dotenv = require("dotenv").config();//this needs to be at the top cause .env all are deoendent on it
const express = require("express");
const connectDb = require("./config/dbConnection");

connectDb();//calling the atlas db = ags

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); //this allow to parse data like a parser


app.listen(port,()=>{
    console.log(`server running  on port ${port}`);
});

