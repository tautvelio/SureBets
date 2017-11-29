var operations = {
	getSports: {
		type: 'get',
		version: 'v2',
		endpoint: 'sports',
	},
	getLeagues: {
		type: 'get',
		version: 'v2',
		endpoint: 'leagues',
		required: ['sportId'],
	},
	getFixtures: {
		type: 'get',
		version: 'v1',
		endpoint: 'fixtures',
		required: ['sportId'],
	},
	getOdds: {
		type: 'get',
		version: 'v1',
		endpoint: 'odds',
		required: ['sportId'],
	}
};

module.exports = operations;