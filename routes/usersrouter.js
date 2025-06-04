const express = require("express");
const router = express.Router();
const {registerUser} = require("../controllers/authController");

router.get("/", (req, res) => { 
    res.send("User Home Page");
});
router.post('/register', registerUser); //all code is send authController.js

router

module.exports = router;

