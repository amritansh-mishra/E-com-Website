const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const ownerModel = require('../models/owner-models');
const isAdmin = require('../middlewares/isAdmin');
const bcrypt = require('bcrypt');


// Importing the owner model to interact with the owners collection in the database


// ===========================
// 1. Create Owner (only once)
// ===========================
if (process.env.NODE_ENV === 'development') {
  router.post('/create', async (req, res) => {
    try {
        // checks if owner exist
      const existingOwners = await ownerModel.find();
      if (existingOwners.length > 0) {
        return res
          .status(403)
          .send("Owner already exists. Permission denied to create another.");
      }

      const { fullname, email, password } = req.body;

      if (!fullname || !email || !password) {
        return res.status(400).send("All fields are required.");
      }

      const hashedPassword = await bcrypt.hash(password, 10); // secure the password

      const createdOwner = await ownerModel.create({
        fullname,
        email,
        password: hashedPassword,
        role: 'owner' // important: this field is used to verify access
      });

      res.status(201).send("Owner created successfully.");
    } catch (err) {
      console.error("Error creating owner:", err);
      res.status(500).send("Internal Server Error");
    }
  });
}

router.get('/admin', isAdmin, (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', {success}); 
});


module.exports = router;
// This is a basic router setup for the owners section of an e-commerce application.