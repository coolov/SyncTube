'use strict';

// npm imports
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var MongoDBStore = require('connect-mongodb-session')(session);

require('./passport')(passport);

var settings = require('./settings');
var videoQueue = require('./tools/videoQueue');
var User = require('./models/user');
videoQueue.whenCurrentVideoChanges(function() {
    io.emit('updateQueue');
    io.emit('currentVideoChanged', videoQueue.getCurrentVideoInfo());
});

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
    secret: settings.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week 
    },
    store: new MongoDBStore({
	uri: settings.dbUri,
	collection: settings.sessionCollection
    })
}));
app.use(passport.initialize());
app.use(passport.session());

// Handle routing to applications
app.get('/', function(req, res) {
    res.sendFile('player.html', {root: __dirname + '/apps/player'});
});
app.get('/admin', function(req, res) {
    res.sendFile('admin.html', {root: __dirname + '/apps/admin'});
});

function returnUserOrContinue (req, res, next) {
    if (req.isAuthenticated()) {
	var user = { user: {
	    username: req.user.username
	}};
	res.json(user);
    } else {
	return next()
    }
}

// User API
app.post('/userApi/login',
	 returnUserOrContinue,
	 passport.authenticate('localSignUp'),
	 function(req, res) {
	     var user = { user: {
		 username: req.user.username
	     }};
	     res.json(user);
	 });

app.post('/userApi/logout', function(req, res) {
    if (req.isAuthenticated()) {
	req.logOut();
    }
    res.send(null);
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
    socket.on('foo', function() {
	console.log(socket.id);
    });

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

