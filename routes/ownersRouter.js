const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const ownerModel = require('../models/owner-models');
// Importing the owner model to interact with the owners collection in the database


if(process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {

        let owner= await ownerModel.find();
        if(owner.length > 0) {
            return res
            .status(500)
            .send("Owner already exists,permission denied to create another owner");
        }
        let { fullname, email, password } = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });
        res.status(201).send(createdOwner);
        // Here you would typically create a new owner in the database


    })
};


router.get('/admin', (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', {success}); 
});



module.exports = router;
// This is a basic router setup for the owners section of an e-commerce application.