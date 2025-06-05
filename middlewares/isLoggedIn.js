const jwt = require('jsonwebtoken');
const userModel = require('../models/user-models');

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'You must be logged in to access this page');
        return res.redirect('/');    // Redirect to login if no token is found
    }
     // if token is found, verify it
    try{

        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);   // Verify the token using the secret key
        let user = await userModel
         .findOne({email: decoded.email})  // Find the user, but  user ka saara data aaega , toh password nahi chahiye humein
         .select('-password');  // thi code excludes the password field from the user data returned by the above code.
        
         req.user = user; // request mai user name ki object create kri
        
        
         next();  // Call the next middleware or route handler
    }catch (err) {
        console.error(err);
        req.flash('error', 'Invalid token, please log in again');
        return res.redirect('/');  // Redirect to login if token verification fails
    }
    // If the token is valid, proceed to the next middleware or route handler
    // If the token is invalid, redirect to login
}; 