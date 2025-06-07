require("dotenv").config();
const express = require('express');
const app = express();
const db = require('./config/moongoose-connection');
const path = require('path');
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");
const session = require('express-session');
const flash = require('connect-flash');

const{generateToken} = require('./utils/generateToken');
const cookieParser = require('cookie-parser');



app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(session({  //flash messages ke liye session use hota hai
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET // Secret key for session management
}));
app.use(flash()); // Initialize flash messages

app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/", indexRouter);



app.listen(3000);