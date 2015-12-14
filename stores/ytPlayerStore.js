var ytAPI = require('./../tools/ytapi.js');
var player = null;
var currentVideoInfo = null;

function createPlayer(callback) {
    var done = false;
    ytAPI().then(function(api) {
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

function setState(videoInfo) {
    if (!currentVideoInfo ||
	currentVideoInfo.videoId != videoInfo.videoId) {
	currentVideoInfo = videoInfo;
	syncEverything();
    } else {
	syncTime();
    }
}

function syncEverything() {
    syncVideo(syncTime);
}

function syncVideo(callback) {
    console.log('set the video');
    player.loadVideoById({
	videoId: currentVideoInfo.videoId
    });
    callback();
}

function syncTime() {
    var timeDiff = (Date.now() - currentVideoInfo.videoStartTime)/1000;
    player.seekTo(timeDiff);
    player.playVideo();
}


function getCurrentVideoInfo() {
    return currentVideoInfo;
}

module.exports = {
    createPlayer: createPlayer,
    getCurrentVideoInfo: getCurrentVideoInfo,
    setState: setState
}
