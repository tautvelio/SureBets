var pinnacleAPI = require('./pinnacleAPI');
var pinnacle = new pinnacleAPI('username', 'password');
var Promise = require('bluebird');
var _ = require('lodash');

function getpinnacle() {

    var options = {sportId: 29};

    const fixtures = new Promise(function(resolve, reject){

      pinnacle.getFixtures(options, function(err, response, body) {
        if (err) throw new Error(err);

        var pinnFixtures = [];
        body.league.forEach(function(leagues){
          leagues.events.forEach(function(event){ 
            if (event.status == 'I'){
              pinnFixtures.push({
                'id': event.id,
                'homeTeamName': event.home,
                'awayTeamName': event.away
              });
            };    
          });
        });
        resolve({ pinnFixtures: pinnFixtures });
      });
    });

    var options = {sportId: 29, oddsFormat: "DECIMAL"};

    const odds = new Promise(function(resolve, reject){

      pinnacle.getOdds(options, function(err, response, body) {
        if (err) throw new Error(err);

        var pinnOdds = [];
        body.leagues.forEach(function(league){
          league.events.forEach(function(event){
            event.periods.forEach(function(period){
              if (period.moneyline !== undefined) {
                pinnOdds.push({
                  'id': event.id,
                  'homeTeamOdds': period.moneyline.home,
                  'drawOdds': period.moneyline.draw,
                  'awayTeamOdds': period.moneyline.away
                }); 
              };
            });
          });
        });
        resolve({ pinnOdds: pinnOdds });
      });
    });
    return Promise.all( [fixtures, odds ]);

}


module.exports = getpinnacle;