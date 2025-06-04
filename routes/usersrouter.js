const express = require("express");
const router = express.Router();
const userModel = require('../models/user-models');

router.get("/", (req, res) => { 
    res.send("User Home Page");
});
router.post('/register', async (req, res) => {
    try{
    let { fullname, email, password} = req.body;

    
    let user = await userModel.create({
        fullname,
        email,
        password
    });
    res.send(user);}
    catch(err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

module.exports = router;

