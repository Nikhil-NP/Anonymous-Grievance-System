//the error hadler  middleware is the only middleware that  takes 5 args,hense we know for certian this is error handler,
//  hense easy to route whenever error detected its passed here
const {constants} = require("../constants");
const errorHandler = (err,req,res,next) =>{
    //res.json({message: err.message,stacktrace: err.stack });
    const statuscode = res.statuscode ? res.statuscode : 500;
    switch (statuscode) {
        case constants.FORBIDDEN
            :res.json({ title: "FORBIDDEN", message : err.message,stacktrace : err.stack});
            break;
        case constants.UNAUTHORIZED
            :res.json({ title: "UNAUTHORIZED", message : err.message,stacktrace : err.stack});
            break;
        case constants.SERVER_ERROR
            :res.json({ title: "SERVER_ERROR", message : err.message,stacktrace : err.stack});
            break;   
        case constants.NOT_FOUND
            :res.json({ title: "NOT_FOUND", message : err.message,stacktrace : err.stack});
            break;
        case constants.VALIDATION_ERROR
            :res.json({ title: "VALIDATION_ERROR", message : err.message,stacktrace : err.stack});
            break; 

        default:console.log('no know error detected');
            break;
    }

    
    
};

module.exports = {errorHandler};