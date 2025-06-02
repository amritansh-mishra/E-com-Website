
const mongoose = require('mongoose');

mongoose
.connect('mongodb://localhost:27017/Ecommerce')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;

// is file ko app.js main require tabhi kar skte hai jab ye file kuch export ka rhi ho