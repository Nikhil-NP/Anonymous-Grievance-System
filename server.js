

const express = require("express");


const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); //this allow to parse data like a parser

app.listen(port,()=>{
    console.log(`server running  on port ${port}`);
});

