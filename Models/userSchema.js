const mongoose = require('mongoose');
const validator = require('validator');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: 'Invalid email format'
        }
    },
    password:{
        type: String,
        required: true,
        validate:{
            validator: function(value) {
                return validator.isStrongPassword(value) // Ensures the password is strong
            },
            message: 'Provide a Strong Password'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// generate a token for the user
userSchema.methods.generateAuthToken = function() {
    const token = JWT.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d'})
     return token;   
}// Token expires in 1 day

// compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;