'use strict';

// npm imports
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
require('./passport')(passport);

var dbUrl = require('./settings').dbUrl;
var videoQueue = require('./tools/videoQueue');
var User = require('./models/user');
videoQueue.whenCurrentVideoChanges(function() {
    io.emit('updateQueue');
    io.emit('currentVideoChanged', videoQueue.getCurrentVideoInfo());
});
mongoose.connect(dbUrl);

// Globals
var listenPort = process.argv[2] ? process.argv[2] : 3000
var chatMessages = [];
var messageNumber = 0;


// Setting up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Handle routing to static content
app.use(express.static(__dirname));
// Session handling
app.use(session({
    secret: 'supersecretstring',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Handle routing to applications
app.get('/', function(req, res) {
    console.log(req.session);
    res.sendFile('player.html', {root: __dirname + '/apps/player'});
});
app.get('/admin', function(req, res) {
    res.sendFile('admin.html', {root: __dirname + '/apps/admin'});
});

// User API
app.post('/login', passport.authenticate('localSignUp'), function(req, res) {
    console.log(req.user);
    console.log(req.session);
    res.json(req.user);
});

// Admin API
app.post('/adminAPI/queueVideo', function(req, res) {
    var videoId = req.body.videoId;
    videoQueue.queueVideo(videoId, function() {
	res.json(videoQueue.getQueue());
	io.emit('updateQueue');
    });
});

app.post('/adminAPI/changeVideo', function(req, res) {
    var videoId = req.body.videoId;
    videoQueue.changeVideo(videoId, function() {
	res.json(videoQueue.getQueue());
	io.emit('updateQueue');
    });
});
app.get('/adminAPI/getQueue', function(req, res) {
    res.json(videoQueue.getQueue());
});

io.on('connection', function(socket) {
    // Admin land
    socket.emit('updateQueue');

    // User Land
    socket.on('syncVideo', function() {
	socket.emit('currentVideoChanged', videoQueue.getCurrentVideoInfo());
    });
    socket.on('sendMessage', function(message) {
	socket.broadcast.emit('newMessage', message);
    })
});

server.listen(listenPort, '0.0.0.0', function(){
    console.log('listening on *:', listenPort);
});

