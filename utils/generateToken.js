const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    //yaha par voh details pass karte hain jo humein chahiye hoti hain jb token decode hota hai
    return jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET);
};

module.exports.generateToken = generateToken;