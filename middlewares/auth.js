const jwt = require('jsonwebtoken');
const User = require('../models/user');


exports.isAuth = async (request, response, next) => {
    if(request.headers && request.headers.authorization){
        try {
            const token = request.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            console.log(request.headers.authorization);
            const user = await User.findById(decode.userId)
            if(!user){
                return response.json({succes: false, message: "Unauthorized access!"})
            } 
            request.user = user;
            next();
        } catch (error) {
            if(error.name === "JsonWebTokenError"){
                return response.json({succes: false, message: "Unauthorized access!"}) 
            }
            if(error.name === "TokenExpiredError"){
                return response.json({succes: false, message: "Session expired, try sign-in!"}) 
            }
            return response.json({succes: false, message: "Internal serve error!"}) 

        }
    }else{
        return response.json({succes: false, message: "Unauthorized access!"})
    }
};