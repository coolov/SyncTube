// npm imports
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var videoQueue = require('./tools/videoQueue');

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

// Setting up bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Admin API
app.post('/adminAPI/queueVideo', function(req, res) {
    var videoId = req.body.videoId;
    videoQueue.queueVideo(videoId, function() {
	console.log(videoQueue.getQueue());
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

// Handle routing to static content
app.use(express.static(__dirname));

io.on('connection', function(socket) {
    io.emit('updateQueue');

    socket.on('sendMessage', function(message) {
	socket.broadcast.emit('newMessage', message);
    })
});

server.listen(listenPort, '0.0.0.0', function(){
    console.log('listening on *:', listenPort);
});

