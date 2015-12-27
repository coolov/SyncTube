'use strict';

var siteUrl = 'http://localhost:3000';
var loginUrl = siteUrl + '/userApi/login';
var logoutUrl = siteUrl + '/userApi/logout';

var request = require('request');
var userStore = require('./../stores/userStore');
var socket = require('socket.io-client')();

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

function logout() {
    userStore.setUser({'user': null});
    request.post(logoutUrl);
}

module.exports= {
    login: login,
    logout: logout
};
