'use strict';

var siteUrl = 'http://localhost:3000';
var loginUrl = siteUrl + '/userApi/Login';

var request = require('request');
var userStore = require('./../stores/userStore');

function login(username, password) {
    request.post({
	url: loginUrl,
	form: {
	    username: username,
	    password: password
	}},
	function(err, response, body) {
	    var user = JSON.parse(body).user;
	    userStore.setUser({'user': user});
	});
}

module.exports = {
    login: login
}
