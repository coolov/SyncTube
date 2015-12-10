// npm imports
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

// Custom libs
var playerManager = require('./tools/playerManager/playerManager');
playerManager.queueVideo('BZP1rYjoBgI', function() {
    var videoInfo = playerManager.currentVideoInfo();
    io.emit('changeVideo', videoInfo.videoId);
    console.log('emitted new vid');
    playerManager.queueVideo('8g2KKGgK-0w');
});



// Globals
var listenPort = process.argv[2] ? process.argv[2] : 3000
var chatMessages = [];
var messageNumber = 0;


// Handle routing to applications
app.get('/', function(req, res) {
    res.sendFile('player.html', {root: __dirname + '/apps/player'});
});
app.get('/admin', function(req, res) {
    res.sendFile('admin.html', {root: __dirname + '/apps/admin'});
});


// Admin API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/adminAPI/queueVideo', function(req, res) {
    var videoId = req.body.videoId;
    playerManager.queueVideo(videoId, function(videoQueue) {
	res.json({videoQueue: videoQueue});
    });
});
app.post('/adminAPI/changeVideo', function(req, res) {
    var videoId = req.body.videoId;
    playerManager.changeCurrentVideo(videoId, function(videoQueue) {
	res.json({videoQueue: videoQueue});
    });
    io.emit('changeVideo', videoId);
});
app.get('/adminAPI/getQueue', function(req, res) {
    res.json({videoQueue: playerManager.getQueue()});
});

// Handle routing to static content
app.use(express.static(__dirname));

io.on('connection', function(socket) {
    console.log('got a connection');

    socket.on('getCurrentVideo', function() {
	var videoInfo = playerManager.currentVideoInfo();
	socket.emit('changeVideo', videoInfo.videoId);
    });
    socket.on('syncMe', function() {
	console.log(Date.now());
	console.log(playerManager.currentVideoStartTime());
	socket.emit('syncVideo', playerManager.currentVideoStartTime());
    });
});

server.listen(listenPort, '0.0.0.0', function(){
    console.log('listening on *:', listenPort);
});

// Start checking if the video is over every second
setInterval(function () {
    if (playerManager.isVideoOver()) {
	playerManager.nextVideo(io);
    }
}, 1000);
