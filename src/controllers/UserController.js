const User = require('../models/UserModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../utils/Email.js')

// Registers a new user.

const userRegistration = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // email into lowercase
        const emailLowerCase = email.toLowerCase();

        // Check if user with the given email already exists
        const userExist = await User.findOne({ email: emailLowerCase });
        if (userExist) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the user's password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user record
        const newUser = await User.create({
            username,
            email: emailLowerCase,
            password: hashPassword
        });

        // Send success response if user is created
        if (newUser) {
            res.status(201).json({ message: "User created successfully" });
        } else {
            throw new Error('User creation failed');
        }

    } catch (error) {
        next(error); // Forward error to the error handling middleware
    }
};


// Logs in a user.

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // email into lowercase
        const emailLowerCase = email.toLowerCase();

        // Check if user with the given email exists
        const user = await User.findOne({ email: emailLowerCase });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }, process.env.JWTSCERET, { expiresIn: '8h' });

        // Send token and success message
        res.status(200).json({ token, message: "Logged in successfully" });

    } catch (error) {
        next(error); // Forward error to the error handling middleware
    }
};


// Initiates password reset process.

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // email into lowercase
        const emailLowerCase = email.toLowerCase();

        // Find user by email
        const user = await User.findOne({ email: emailLowerCase });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // Send OTP via email
        await sendEmail(emailLowerCase, "Password Reset", `Your OTP is: ${otp}`);

        // Update user record with OTP
        user.otp = otp;
        await user.save();

        // Send success response
        res.status(200).json({ message: `OTP sent to ${email}` });

    } catch (error) {
        next(error); // Forward error to the error handling middleware
    }
};

// Resets user's password.

const resetPassword = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;

        // email into lowercase
        const emailLowerCase = email.toLowerCase();

        // Find user by email and verify OTP
        const user = await User.findOne({ email: emailLowerCase });
        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear OTP
        user.password = hashedPassword;
        user.otp = '';
        await user.save();

        // Send success response
        res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        next(error); // Forward error to the error handling middleware
    }
};


module.exports = { userRegistration, userLogin, forgotPassword, resetPassword };
