const express = require("express");
const router = express.Router();
const {registerUser, loginUser, logoutUser} = require("../controllers/authController");



// Importing the registerUser and loginUser functions from authController.js
// to handle user registration and login functionality
// This is a basic router setup for the users section of an e-commerce application.

router.get("/", (req, res) => { 
    res.send("User Home Page");
});
router.post('/register', registerUser); //all code is send authController.js

router.post('/login', loginUser); //  loginUser function in authController.js


router.get('/logout', logoutUser);

module.exports = router;

