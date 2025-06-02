
const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: String,

    password: String,

    gstin: String,

    picture: String,

    });

module.exports = mongoose.model('owner', ownerSchema);