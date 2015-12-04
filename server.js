// npm imports
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

// Custom libs
var playerManager = require('./models/playerManager/playerManager');
playerManager.queueVideo('8g2KKGgK-0w');
// Start checking if the video is over every second
setInterval(function () {
    if (playerManager.isVideoOver()) {
	playerManager.nextVideo();
    }
}, 1000);


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
});
app.get('/adminAPI/getQueue', function(req, res) {
    res.json({videoQueue: playerManager.getQueue()});
});


// Handle routing to static content
app.use(express.static(__dirname));

io.on('connection', function(socket){
    socket.on('getVideo', function() {
	videoInfo = playerManager.currentVideoInfo()
	socket.emit('setVideo', videoInfo.videoId);
    });
});

server.listen(listenPort, function(){
    console.log('listening on *:', listenPort);
});

