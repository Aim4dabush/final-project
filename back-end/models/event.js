const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    eventName: { type: String, required: true },
    imageLink: { type: String, required: true },
    startTime: { type: String, required: true},
    endTime: { type: String, required: true },
    date: { type: String, required: true},
    addressLink: { type: String, required: true },
    address: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);