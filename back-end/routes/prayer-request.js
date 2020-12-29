const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

// const PrayerRequest = require('../models/prayer-request');

router.post('', (req, res, next) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
            expires: process.env.EXPIRES
        }
    });

    transporter.verify((err, info) => {
        if(err){
            console.log(err);
        } else {
            console.log('connection successful')
        }
    })

    transporter.sendMail({
        from: req.body.email,
        to: 'edarasato@gmail.com',
        subject: req.body.request + ' ' + req.body.firstName + ' ' + req.body.lastName + ' ' + req.body.phoneNumber,
        html: req.body.requestDetails
    }).then(info => {
        if(info) {
            res.status(200).json({
                message: 'Message sent!'
            });
        }
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;