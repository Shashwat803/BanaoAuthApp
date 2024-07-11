const mongoose = require('mongoose');

// User Register Schema
const userRegisterSchema = mongoose.Schema({
    username: { 
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already registered"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    otp:{
        type: String,
        default:''
    }
}, {
    timestamps: true
});

// User Login Schema
const userLoginSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
});

module.exports = {
    UserRegister: mongoose.model("UserRegister", userRegisterSchema),
    UserLogin: mongoose.model("UserLogin", userLoginSchema)
};
