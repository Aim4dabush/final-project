const express = require('express');

const router = express.Router();

//import event model
const Event = require('../models/event');

const checkAuth = require('../middleware/check-auth')

//Post events to database
router.post('', checkAuth, (req, res, next) => {
    const event = new Event({
        eventName: req.body.eventName,
        imageLink: req.body.imageLink,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        addressLink: req.body.addressLink,
        address: req.body.address
    });
    event.save();
    res.status(201).json({
        message: 'Post added successfully'
    })
});

//Get events from database
router.get('', (req, res, next) => {
    // const events = [
    //     {
    //         eventName: 'Outreach 55',
    //         imageLink: 'https://bn1305files.storage.live.com/y4mW0oDvHvoOPkld73C9MrUFabtJkVMZXMYnfi7t5akDXTAQWShZBJHl8BIj1N0oXlRgikq0o27KVgMSidaYkgw4V5VOOlRF5DsUDWFaOieOAD3YcpGzUiarue2MlByKrK5dixTRgXc78SJmyrG2Eok5T-ur6RXBTCiQ6hDPnUo3HAag-tRWEK_7-_akroESSoq?width=660&height=371&cropmode=none',
    //         startTime: '10:00 AM',
    //         endTime: '1:00 PM',
    //         date: '2020-12-03',
    //         addressLink: 'https://goo.gl/maps/5eMqmC8jmG8mcJdJ9',
    //         address: '1282 East Bianchi Road Stockton, CA 95210'
    //     }
    // ]
    Event.find()
        .then(documents => {
            res.status(200).json({
                message: 'Events fetched successfully',
                events: documents
            });
        });  
});

//Delete event from database by id
router.delete('/:id', checkAuth, (req, res, next) => {
    Event.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(result);
            res.status(200).json('Post deleted!');
        });  
});

module.exports = router;