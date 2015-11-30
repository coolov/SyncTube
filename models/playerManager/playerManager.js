var ytDataApi = require('./ytDataApi');

var videoQueue = [];
var videoStartTime = Date.now()

function getVideoRunTime(videoId, callback) {
    ytDataApi.getVideoLengthInMilliseconds(videoId, function(videoLength) {
	var runTimeInMilliseconds = videoLength;
	callback(runTimeInMilliseconds);
    });
}

function updateVideoStartTime() {
    videoStartTime = Date.now()
}

function addVideoToQueue(videoId, callback) {
    getVideoRunTime(videoId, function(runTimeInMilliseconds) {
	videoInfo = {
	    videoId: videoId,
	    runTimeInMilliseconds: runTimeInMilliseconds,
	    queueNumber: videoQueue.length
	};
	videoQueue.push(videoInfo);
	if (videoQueue.length == 1) {
	    updateVideoStartTime();
	}
	if (callback) {
	    callback(videoQueue);
	}
    });
}

function changeCurrentVideo(videoId, callback) {
    getVideoRunTime(videoId, function(runTimeInMilliseconds) {
	videoInfo = {
	    videoId: videoId,
	    runTimeInMilliseconds: runTimeInMilliseconds
	};
	videoQueue.shift();
	videoQueue.unshift(videoInfo);
	if (videoQueue.length == 1) {
	    updateVideoStartTime();
	}
	if (callback) {
	    callback(videoQueue);
	}
    });
}

function nextVideo() {
    videoQueue.shift();
    updateVideoStartTime();
}

function isVideoOver() {
    if (videoQueue[0]) {
	videoDuration = videoQueue[0].runTimeInMilliseconds;
	return (Date.now() >= videoStartTime + videoDuration ? true : false);
    } else {
	return false;
    }
}

function getCurrentVideoInfo() {
    return videoQueue[0];
}

function getQueue() {
    return videoQueue;
}

module.exports = {
    queueVideo: addVideoToQueue,
    changeCurrentVideo: changeCurrentVideo,
    nextVideo: nextVideo,
    isVideoOver: isVideoOver,
    currentVideoInfo: getCurrentVideoInfo,
    getQueue: getQueue
}

