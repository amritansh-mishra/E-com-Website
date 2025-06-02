const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const db = require('./config/moongoose-connection');

const path = require('path');


app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use("/owners", require('./routes/owner-routes'));
app.use("/users", require('./routes/user-routes'));  
app.use("/products", require('./routes/product-routes'));

app.listen(3000);