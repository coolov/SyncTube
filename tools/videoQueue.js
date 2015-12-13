'use strict';

var ytDataApi = require('./ytDataApi');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var queue = [];
var videoNumber = 0;
var videoStartTime = 0;
var currentTimeout = null;

function newCurrentVideo() {
    clearTimeout(currentTimeout);
    videoStartTime = Date.now();
    currentTimeout = setTimeout(goToNextVideo, queue[0].runTimeInMilliseconds);
    eventEmitter.emit('newCurrentVideo');
}

function goToNextVideo() {
    queue.shift();
    if (queue) {
	console.log(queue);
    }
    if (queue[0]) {
	newCurrentVideo();
    } else {
	eventEmitter.emit('newCurrentVideo');	
    }
}

function whenCurrentVideoChanges(callback) {
    eventEmitter.on('newCurrentVideo', callback);
}

function queueVideo(videoId, callback) {
    ytDataApi.getVideoProperties(videoId, ['title', 'runTime'], function(videoProperties) {
	queue.push({
	    videoId: videoProperties.videoId,
	    videoTitle: videoProperties.title,
	    runTimeInMilliseconds: videoProperties.runTime, 
	    videoNumber: videoNumber
	});
	videoNumber++;
	if (queue.length == 1) {
	    newCurrentVideo()
	}
	callback();
    });
}

function changeVideo(videoId, callback) {
    if (queue) {
	ytDataApi.getVideoProperties(videoId, ['title', 'runTime'], function(videoProperties) {
	    queue[0] = {
		videoId: videoProperties.videoId,
		videoTitle: videoProperties.title,
		runTimeInMilliseconds: videoProperties.runTime, 
		videoNumber: videoNumber
	    };
	    videoNumber++;
	    newCurrentVideo();
	    callback();
	});
    } else {
	queue.push(videoId);
    }
}

function getQueue() {
    return {
	videoQueue: queue
    };
}

module.exports = {
    queueVideo: queueVideo,
    changeVideo: changeVideo,
    getQueue: getQueue,
    whenCurrentVideoChanges: whenCurrentVideoChanges
};
