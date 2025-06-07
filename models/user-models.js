
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: String,

    password: String,

    cart: [{
        type: mongoose.Schema.Types.ObjectId,   //cart ek aisa aray hai jisme product ki ids hongi
        //ismai bas ek pdt ek baar add hoga
        ref: 'product',  //ref se pata chalta hai ki ye product model se related hain 
    }],

    orders: {
        type: Array,
        default: [],
    },
    
    phoneNumber: Number,

    picture: String,

    role: {
    type: String,
    enum: ['customer', 'owner'],
    default: 'customer',
  },
});

 module.exports = mongoose.model('user', userSchema);