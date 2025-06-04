
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: String,

    password: String,

    cart: {
        type: Array,
        default: [],
    },

    orders: {
        type: Array,
        default: [],
    },
    
    phoneNumber: Number,

    picture: String,

    });

    module.exports = mongoose.model('user', userSchema);