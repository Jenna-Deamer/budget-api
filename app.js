const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// create express app & set all content to json
const app = express();
app.use(bodyParser.json());

// db conn
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    
    // CORS in dev mode to accept requests from localhost:4200
    // not needed in prod as angular app runs on same domain
    const cors = require('cors');
    app.use(cors({
        origin: process.env.CLIENT_URL,
        methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS'
    }));
}

mongoose.connect(process.env.CONNECTION_STRING, {})
.then((res) => { console.log ('Connected to MongoDB'); })
.catch((err) => { console.log (`DB Connection Failed ${err}`); });

// enable CORS for angular client app BEFORE controllers

//map routes

// route any requests at the root to load the angular front-end app
// app.use(express.static(__dirname + '/public'));
// app.get('*', (req, res) => res.sendFile(__dirname + '/app/index.html'));

// start server
app.listen(3000, () => {
   
  });

module.exports = app;