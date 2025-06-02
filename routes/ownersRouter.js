const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hey");
});

module.exports = router;
// This is a basic router setup for the owners section of an e-commerce application.