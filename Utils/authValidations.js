const validator = require('validator');

exports.validateEmail = (email,res)=>{
    if(!validator.isEmail(email)){
        return res.status(400).json({ message : "Invalid email format", success: false });
    }
}

exports.validatePassword = (password,res)=>{
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({ message : "Provide a Strong Password", success: false });
    }
}