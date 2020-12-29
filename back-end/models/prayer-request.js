const mongoose = require('mongoose');

const prayerRequestSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true},
    request: { type: String, required: true },
    requestDetails: { type: String, required: true }
});

module.exports = mongoose.model('PrayerRequest', prayerRequestSchema);