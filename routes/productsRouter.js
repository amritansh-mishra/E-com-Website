const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const productModel = require('../models/product-models'); //db mai store karne ke liye

router.post('/create',upload.single("image"), async (req, res) => {  //input name is image in ejs.
    try{ let{name, price, discount, bgcolor, panelcolor, textcolor} = req.body; // Extracting data from the request body
    
    
    let product = await productModel.create({
    
    image:req.file.buffer, // Store the image data from memory
      bgcolor,
      panelcolor,
      textcolor,           
      name,
      price,
      discount
    
  })
    req.flash("success", "Product created successfully"); // Flash message for success
    res.redirect("/owners/admin") // Send the created product as a response
 } catch(err) {
    res.status(500).send(err.message); // Handle errors appropriately
 }
});

module.exports = router;


//image upload hui h memory me, ab isko db me store karna hai