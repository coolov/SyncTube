var ytAPI = require('./ytapi.js');
var player = null;
var currentVideoId = null;

function createPlayer(callback) {
    var done = false;
    ytAPI().then( function(api) {
	player = new api.Player('player', {
	    height: '390',
	    width: '640',
	    videoId: null,
	    events: {
		'onReady': callback
	    }
	});
    });
}

function changeVideo(videoId, callback) {
    player.loadVideoById({
	'videoId': videoId,
    });
    callback();
}

function setTime(seconds) {
    player.seekTo(seconds);
}

module.exports = {
    getPlayer: createPlayer,
    changeVideo: changeVideo,
    setTime: setTime
}


