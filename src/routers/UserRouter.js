const express = require('express')
const router = express.Router()
const { userRegistration, userLogin, forgotPassword, resetPassword } = require('../controllers/UserController.js')


// Route for user registration
router.post('/register', userRegistration)

// Route for user login
router.post('/login', userLogin)

// Route for forgot password
router.post('/forgotPassword', forgotPassword)

// Route for resetting passwor
router.post('/resetPassword', resetPassword );


module.exports = router