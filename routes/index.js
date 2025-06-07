const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedIn');
const productModels = require('../models/product-models');


router.get('/', (req, res) => {
    let error = req.flash('error'); // Clear any previous error messages
    res.render('index',{ error , loggedin: false}); //loggedin false taaki index page par login ka content na aaye
});
 //vahi bnda pohche jo logged in hai
 // isLoggedIn middleware check karega ki user logged in hai ya nahi
 // agar nahi hai to redirect karega login page par
 // agar hai to shop page render karega

router.get('/shop',isLoggedin, async (req, res) => { 
   let products = await productModels.find()   // Fetch all products from the database, to shop page
    res.render("shop",{products});
});

module.exports = router;