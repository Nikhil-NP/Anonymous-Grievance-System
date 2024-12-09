require('dotenv').config({ //there is path issue hense explicitely need to declare the directory to move from and look for .env name 
    path: require('path').resolve(__dirname, '../.env')  });//Explicit path resolution 
  
const  { GoogleGenerativeAI } = require("@google/generative-ai") ;
const asyncHandler = require('express-async-handler');





const genAI = new GoogleGenerativeAI(process.env.GEMINI);


//desc : returns true if the response is safe to read for teacher
//args: user inputs his title and description from the complaint
//return : boolean true or false based on the user message
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "you are a nfsw detector,this is a complaint  if you find it nfsw or it has hatespeech against the teacher  then reply : unsafe, if you feel its valid complaint respond  :safe",
  });

  const validateResponse = asyncHandler(async (prompt) => {
    try {
        let p = `[ ${prompt} ]`;  //design choice makes it look like [ title : description]
        console.log(p);
        const result = await model.generateContent(prompt);
        //console.log(result.response.text()); // Correctly access the result
        const checkResponse = result.response.text()
        console.log('the resopnse from gemini',checkResponse);
        if (checkResponse.includes('unsafe')){
            return false;
        }
        else{
            return true;
        }
    } catch (error) {
        console.error('Error in content validation:', error);
        return false;
    }
});

module.exports = {validateResponse};