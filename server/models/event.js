var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    id: Number,
    homeTeamName: String,
    homeTeamOdds: Number,
    drawOdds: Number,
    awayTeamName: String,
    awayTeamOdds: Number
});

module.exports = mongoose.model('Event', eventSchema);