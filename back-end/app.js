//import express
const express = require('express');
//import data parser
const bodyParser = require('body-parser');
//import mongoose
const mongoose = require('mongoose');


//import event route from routes folder
const eventsRoutes = require('./routes/event');
//import prayer request route from routes folder
const prayerRequestRoutes = require('./routes/prayer-request')
//import user route from routes folder
const userRoutes = require("./routes/user");

//store express package in app constant
const app = express();


//Connection to database
mongoose.connect('mongodb+srv://aim4dabush:foWZZ4PsPHSjAOMd@cluster0.ik3qc.mongodb.net/city-church', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed');
    });

app.use(bodyParser.urlencoded({ extended: false }))
//Parses post data
app.use(bodyParser.json());

//Set headers for app
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Wtih, Content-Type, Accept, Authorization, X-Custom-Header');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
    next();
});

app.use('/api/events', eventsRoutes);
app.use('/api/prayer-request', prayerRequestRoutes);
app.use('/api/user', userRoutes);

module.exports = app;