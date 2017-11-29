const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const scrapetopsport = require('./../utils/scrapetopsport2');
const getpinnacle = require('./../utils/getpinnacle2');
const insertData = require('./../utils/insertDataToDb');

router.get('/', function(req, res) {
  let fullList = [];
  Promise.all([getpinnacle(), scrapetopsport()]).then(results => {
    let pinnResults = results[0];
    let topsportResults = results[1];
    let pinnFixtures = pinnResults[0].pinnFixtures;
    let pinnOdds = pinnResults[1].pinnOdds;
    let mergedPinns = [];
    let data = {};
    pinnOdds.forEach(x => {
      let pinnFixture = pinnFixtures.find(f => f.id === x.id);
      if (pinnFixture)
        data = Object.assign({}, x, pinnFixture);
      data.bookmaker = "Pinnacle";
      fullList.push(data);
    });
    fullList = fullList.concat(topsportResults);
    
    
    Promise.resolve(getSureBets(fullList)).then(sureBetsList => {
      res.json({success: true, result: sureBetsList});
    });

  });
});

function getSureBets(bets) {
  return new Promise(function(resolve, reject) {
    let sureBets = [];
    //tikrina ar jau nera idetos tos pacios sakutes
    bets.forEach(bet => {
      let exist = false;
      if (sureBets.length != 0) {
        sureBets.forEach(data => {
          if (bet.homeTeamName === data.homeTeamName && bet.awayTeamName === data.awayTeamName) {
            exist = true;
          }
        });
      }
      let genBet = {
        homeTeamOdds: bet.homeTeamOdds,
        homeTeamOdds_bookmaker: bet.bookmaker,
        homeTeamOdds_URL: bet.URL,
        //drawOdds: bet.drawOdds,
        //drawOdds_bookmaker: bet.bookmaker,
        awayTeamOdds: bet.awayTeamOdds,
        awayTeamOdds_bookmaker: bet.bookmaker,
        awayTeamOdds_URL: bet.URL,
        homeTeamName: bet.homeTeamName,
        awayTeamName: bet.awayTeamName,
        profit: ''
      }

      if (!exist) {
        bets.forEach(betComp => {
          if (bet.homeTeamName === betComp.homeTeamName && bet.awayTeamName === betComp.awayTeamName) {
            if (genBet.homeTeamOdds < betComp.homeTeamOdds) {
              genBet.homeTeamOdds = betComp.homeTeamOdds;
              genBet.homeTeamOdds_bookmaker = betComp.bookmaker;
              genBet.homeTeamOdds_URL = betComp.URL;
            }
            /*if (genBet.drawOdds < betComp.drawOdds) {
              genBet.drawOdds = betComp.drawOdds;
              genBet.drawOdds_bookmaker = betComp.bookmaker;
            }*/
            if (genBet.awayTeamOdds < betComp.awayTeamOdds) {
              genBet.awayTeamOdds = betComp.awayTeamOdds;
              genBet.awayTeamOdds_bookmaker = betComp.bookmaker;
              genBet.awayTeamOdds_URL = betComp.URL;
            }
          }
        });
        let profit = 1 / genBet.homeTeamOdds + /* 1 / genBet.drawOdds + */ 1 / genBet.awayTeamOdds;
        if (profit < 1) {
          genBet.profit = (1 - profit) * 100;
          sureBets.push(genBet);
        }
      }

    });
    resolve(sureBets);
  });
}

module.exports = router;
