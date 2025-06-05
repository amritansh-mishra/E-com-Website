const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedIn');


router.get('/', (req, res) => {
    let error = req.flash('error'); // Clear any previous error messages
    res.render('index',{ error });
});
 //vahi bnda pohche jo logged in hai
 // isLoggedIn middleware check karega ki user logged in hai ya nahi
 // agar nahi hai to redirect karega login page par
 // agar hai to shop page render karega
router.get('/shop',isLoggedin, (req, res) => { 
    res.render("shop");
});

module.exports = router;