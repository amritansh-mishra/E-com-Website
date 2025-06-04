
const mongoose = require('mongoose');

const config = require('config');

const dbgr = require("debug")("development:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/Ecommerce`)
.then(() => {
   dbgr('Connected to MongoDB');
})
.catch((err) => {
    dbgr ('Error connecting to MongoDB:', err);
});

module.exports = mongoose.connection;

// is file ko app.js main require tabhi kar skte hai jab ye file kuch export ka rhi ho