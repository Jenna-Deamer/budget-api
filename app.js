const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const User = require('./models/user');

// create express app & set all content to json
const app = express();
app.use(bodyParser.json());

// db conn
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();

    // CORS in dev mode to accept requests from localhost:4200
    // not needed in prod as angular app runs on same domain
    const cors = require("cors");
    app.use(
        cors({
            // origin: process.env.CLIENT_URL,
            origin: "*",
            methods: "GET,POST,PUT,DELETE,HEAD,OPTIONS",
        })
    );
}

mongoose
    .connect(process.env.CONNECTION_STRING, {})
    .then((res) => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(`DB Connection Failed ${err}`);
    });

//passport setup
// 1. configure session
app.use(
    session({
        secret: process.env.PASSPORT_SECRET,
        resave: true,
        saveUninitialized: false,
    })
);

//  2. initialize Passport w/sessions
app.use(passport.initialize());
app.use(passport.session());

// 3. link passport to our User model & use local strategy by default
let User = require('./models/user');
passport.use(User.createStrategy());

// 4. enable session reads / writes for passport users
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//map routes
const transactionsController = require("./controllers/transactions");
app.use("/v1/api/transactions", transactionsController);

const goalsController = require("./controllers/goals");
app.use("/v1/api/goals", goalsController);

const authController =  require("./controllers/auth");
app.use("/v1/api/users", authController);

// start server
app.listen(3000);
module.exports = app;
