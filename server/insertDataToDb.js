//const connection = require('./config/database');
const events = require('./models/event');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "mongodb://localhost:27017/SureBets";

function connection(callback) {
     MongoClient.connect(url, callback);
    }


module.exports = function insertData(pinnacleEvents, topSportEvents) {
    var newConnection = connection(function (err, db) {
        if (err) throw err;
        
        PinnacleFixtures(pinnacleEvents, db);
        TopsportFixtures(topSportEvents, db);
    });
}


function TopsportFixtures(events, db) {
    var dbTopsport = db.collection("TopsportFixtures");
    return events.map((document) => {
            return dbTopsport.update(
                {
                    homeTeamName: document.homeTeamName,
                    awayTeamName: document.awayTeamName
                },

                {
                    homeTeamName: document.homeTeamName,
                    homeTeamOdds: document.homeTeamOdds,
                    drawOdds: document.drawOdds,
                    awayTeamName: document.awayTeamName,
                    awayTeamOdds: document.awayTeamOdds
                },

                {
                    upsert: true,
                    ordered: true
                })
    })
}

function PinnacleFixtures(events, db) {
    var dbPinnacleFixtures = db.collection("PinnacleFixtures");
    return events.map((document) => {
            return dbPinnacleFixtures.update(
                {
                    id: document.id
                },

                {
                    id: document.id,
                    homeTeamName: document.homeTeamName,
                    homeTeamOdds: document.homeTeamOdds,
                    drawOdds: document.drawOdds,
                    awayTeamName: document.awayTeamName,
                    awayTeamOdds: document.awayTeamOdds
                },

                {
                    upsert: true,
                    ordered: true
                })
    })
}


