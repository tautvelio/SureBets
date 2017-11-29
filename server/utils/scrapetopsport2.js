var request = require('request');
var cheerio = require('cheerio');
var url = "https://en.topsport.lt/odds/today/2"

function scrapetopsport2() {

	return new Promise(function (resolve, reject) {

		request(url, function(err,resp,body){

			var $ = cheerio.load(body);

			var team = $('.condition').map((i,e) =>
	 		e.children[0].data
	 		).get();

			var odd = $('.rate').map((i,e) =>
	 		e.children[0].data
	 		).get();

	 		var url = $("td[class*='more'] a").map((i,e) =>
				$(e).attr("href")
			).get();

			let choseItems = [];
			let urlIt = 0;
			for (i=0; i<team.length; i+=3) {
				choseItems.push({
					'homeTeamName': team[i],
					'homeTeamOdds': odd[i],
					//'draw': team[i+1],
					//'drawOdds': odd[i+1],
					'awayTeamName': team[i+2],
					'awayTeamOdds': odd[i+2],
					'bookmaker': 'Topsport',
					'URL': 'https://topsport.lt' + url[urlIt]
				});
				urlIt++;
			}
			resolve(choseItems);
		})
	})
}
module.exports = scrapetopsport2;
