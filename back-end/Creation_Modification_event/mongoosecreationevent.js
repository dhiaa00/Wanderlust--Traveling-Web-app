const mongoose = require('mongoose');

// Schéma Mongoose pour un événement de voyage
const eventSchema = new mongoose.Schema({
    about: String,
    name: String,
    startdate: Date,
    enddate: Date,
    startTime: String,
    endTime: String,
    location : String,
    place : {
        from : String,
        to : String,
    },
});

module.exports = mongoose.model('Event', eventSchema);
