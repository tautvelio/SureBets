var request = require('request');
var cheerio = require('cheerio');
var url = "https://en.topsport.lt/odds/today/1"

function scrapetopsport() {

	return new Promise(function (resolve, reject) {

		request(url, function(err,resp,body){

			var $ = cheerio.load(body);

			var team = $('.condition').map((i,e) => 
	 		e.children[0].data
	 		).get();

			var odd = $('.rate').map((i,e) => 
	 		e.children[0].data
	 		).get();

			let choseItems = [];
			for (i=0; i<team.length; i+=3) {
				choseItems.push({
					'homeTeamName': team[i],
					'homeTeamOdds': odd[i],
					//'draw': team[i+1],
					'drawOdds': odd[i+1],
					'awayTeamName': team[i+2],
					'awayTeamOdds': odd[i+2]
				});
			}
			resolve(choseItems);
		})
	})
}
module.exports = scrapetopsport;
