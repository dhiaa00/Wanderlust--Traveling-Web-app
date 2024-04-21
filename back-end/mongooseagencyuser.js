const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
    agencyName: { type: String, required: true },
    registrationNumber: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    website: { type: String,required:true },
    location: { type: String, required: true },
});

const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;
