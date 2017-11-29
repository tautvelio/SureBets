var _ = require('lodash');
var request = require('request');
var qs = require('qs');
var operations = require('./pinnacleOperations');


var PinnacleAPI = function(username, password) {
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

	var setOperation = (function(operation){
		this.operation = operation;
	}).bind(this);

	var buildUrl = (function() {
		this.url = 'https://api.pinnacle.com/' + operations[this.operation].version + '/' + operations[this.operation].endpoint;
	}).bind(this);

	var checkRequired = (function(options) {
		var required = operations[this.operation].required;
		if (required) {
			required.forEach((function(key) {
				if (_.isUndefined(options[key])) {
					throw new Error('The ' + this.operation +
					' operation requires the following request data: {' + required.join(', ') + '}');
				}
			}).bind(this));
		}
	}).bind(this);

	var get = (function(options, cb) {
		var requestOptions = {
			url: this.url + '?' + qs.stringify(options),
			rejectUnauthorized: false,
			headers: {
				'Authorization': auth
			}
		};
		request.get(requestOptions, (function (err, response, body) {
			if (err) return cb(err);
			if (!body || _.isEmpty(JSON.parse(body))) return cb(null, '');
			parse(body, function(err, parsed) {
				if (err) return cb(err);
				cb(null, response, parsed);
			});
		}).bind(this));
	}).bind(this);

	var parse = function(body, cb) {
		try {
			var result = JSON.parse(body);
			return cb(null, result);
		}
		catch(e){
			return cb(e + ' Data: ' + body);
		}
	}

	this.getSports = function(cb) {
		var options = {sportId:29};
		setOperation('getSports');
		buildUrl();
		get(options, cb);
	}

	this.getLeagues = function(options, cb) {
		setOperation('getLeagues');
		buildUrl();
		checkRequired(options, cb);
		get(options, cb);
	}

	this.getFixtures = function(options, cb) {
		setOperation('getFixtures');
		buildUrl();
		checkRequired(options, cb);
		get(options, cb);
	}

	this.getOdds = function(options, cb) {
		this.operation = 'getOdds';
		buildUrl();
		checkRequired(options, cb);
		get(options, cb);
	}
}

module.exports = PinnacleAPI;