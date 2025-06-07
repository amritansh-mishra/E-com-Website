const express = require('express');
const router = express.Router();
const isLoggedin = require('../middlewares/isLoggedIn');
const productModels = require('../models/product-models');
const userModels = require('../models/user-models');


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
router.get('/cart', isLoggedin, async (req, res) => {
  let user = await userModels.findOne({ email: req.user.email }).populate("cart");

  let total = 0;
  user.cart.forEach(item => {
    total += item.price - item.discount + 20;
  });

  res.render("cart", { user, total });
});


router.get('/addtocart/:productid',isLoggedin, async (req, res) => { 
   let user = await userModels.findOne({email: req.user.email})  //usermodel kae basis pr logged in bnde ko dhoondh rha
   user.cart.push(req.params.productid); //uske cart mein product id push kr rha
   await user.save() //uske cart ko save kr rha  
   req.flash('success', 'Added to cart'); //flash message for success
   res.redirect('/shop'); //redirect to shop page
});

router.get('/removefromcart/:productid', isLoggedin, async (req, res) => {
    try {
        let user = await userModels.findOne({ email: req.user.email });

        // Remove the product from cart
        user.cart.pull(req.params.productid);
        await user.save();

        req.flash('success', 'Product removed from cart');
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong');
        res.redirect('/cart');
    }
});


module.exports = router;