const mongoose = require('mongoose');

//setting up atlas cloud db ,its a free clustor 
const connectDb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("db connected",connect.connection.host,connect.connection.name)
        console.log("geminiapi",process.env.GEMINI)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;