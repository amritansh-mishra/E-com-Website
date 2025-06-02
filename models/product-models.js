const { text } = require('express');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    bgcolour:String,
    panelcolour:String,
    textcolour:String,
});

module.exports = mongoose.model('product', productSchema);

