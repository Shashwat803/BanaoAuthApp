const mongoose = require('mongoose');

// User Register Schema
const userSchema = mongoose.Schema({
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
        required: [true, "Password is required"],
        minlength: [5, "Password must be at least 5 characters long"]
    },
    otp: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("User", userSchema)

