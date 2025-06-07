const userModel = require('../models/user-models');
const ownerModel = require('../models/owner-models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
try{
    let { fullname, email, password} = req.body;

   let user = await userModel.findOne({ email:email }) // Check if the user already exists
    if (user) {
        return res.status(400).send("User already exists with this email");
    }
    if (!fullname || !email || !password) {
        return res.status(400).send("Please provide all required fields");
    }
    if (password.length < 6) {
        return res.status(400).send("Password must be at least 6 characters long");
    }
    // Hash the password before saving it to the database
    // bcrypt is used to hash the password for security
    bcrypt.genSalt(10, (err, salt) => {  
        bcrypt.hash(password, salt, async (err, hash) => {   // Hash the password 
            if (err) {
                console.error(err);
                return res.status(500).send(err.message);
            }
            else
            {
              let user = await userModel.create({
                fullname,
                email,
                password: hash,
              });
                let token = generateToken(user); // Generate a token for the user
                res.cookie("token", token); // Set the token in a cookie, means userr kae browser mein store ho jayega
                res.send(token);
            }
        });
    });
}   catch(err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
}

module.exports.loginUser = async (req, res) => {
    let { email , password} = req.body; 

    let user = await ownerModel.findOne({ email: email }); 

    if (!user) {
        user= await userModel.findOne({ email });
    }
    if (!user) {
        return res.status(400).send("User not found with this email");
    }

    console.log("User role is:", user.role);



    
    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, result) => {
       if (err) {
            console.error(err);
            return res.status(500).send("Error comparing passwords");
        }
        if (!result) {
            return res.status(400).send("Invalid password");
        }
        let token = generateToken(user); // Generate a token for the user
        res.cookie("token", token); // Set the token in a cookie
        // Redirect based on role
        if (user.role === 'owner') {
            return res.redirect('/owners/admin'); //to admin route
        } else {
            return res.redirect('/shop');  // normal customer route
        }
    });
      
};

module.exports.logoutUser = (req, res) => {
    res.clearCookie("token"); // Clear the token cookie to log out the user
    res.redirect("/"); // Redirect to the home page after logout
};