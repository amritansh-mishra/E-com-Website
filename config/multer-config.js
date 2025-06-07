const { Router } = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();  // Store files in memory
const upload = multer({                  // Configure multer to use memory storage
  storage: storage,
});

module.exports = upload;  // Export the configured multer instance