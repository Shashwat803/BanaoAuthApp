const express = require('express')
const { UserRegister } = require('../models/UserModel')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/Email.Js')



router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const userExist = await UserRegister.findOne({ email })
        if (userExist) return res.status(400).json({ error: 'User already exist' })
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await UserRegister.create({
            username,
            email,
            password: hashPassword
        })
        if (newUser) {
            res.status(200).json({ messsage: "User create successfully" })
        }

    } catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const userExist = await UserRegister.findOne({ email })
        if (userExist && (await bcrypt.compare(password, userExist.password))) {
            const token = jwt.sign({
                user: {
                    username: userExist.username,
                    email: userExist.email,
                    id: userExist.id
                }
            }, process.env.JWTSCERET, { expiresIn: '1h' })
            res.status(201).json({ token, message: "Loggedin Successfully" })
        } else {
            res.status(401).json({ message: "Invalid Email and Password" })

        }
    } catch (error) {
        console.log(error)
    }
})

//forgot password
router.post('/forgotPassword', async (req, res) => {
    try {
        const { email } = req.body
        const emailExist = UserRegister.findOne({ email })
        if (emailExist) {
            const generateOtp = Math.floor(1000 + Math.random() * 9000).toString();
            await sendEmail(email, "Password Reset", `Your OTP is: ${generateOtp}`).then(() => {
                res.status(200).send("Email Send")
            })
            await UserRegister.findOneAndUpdate(
                { otp: generateOtp },
            );
        } else {
            res.status(400).send("Email not found")
        }
    } catch (error) {
        console.log(error)
    }
})

// Reset Password
router.post('/resetPassword', async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await UserRegister.findOne({ email });
        if (user && user.otp === otp ) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await UserRegister.findOneAndUpdate(
                { email },
                { password: hashedPassword, otp: ''}
            );
            res.status(200).send("Password reset successful");
        } else {
            res.status(400).send("Invalid or expired OTP");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});







module.exports = router