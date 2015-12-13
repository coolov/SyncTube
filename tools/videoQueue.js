'use strict';
var ytDataApi = require('./ytDataApi');

var queue = [];
var videoNumber = 0;

function getVideoInfo(videoId, callback) {
    
}

function queueVideo(videoId, callback) {
    queue.push({
	videoId: videoId,
	videoNumber: videoNumber
    });
    videoNumber++;
    callback();
}

function changeVideo(videoId, callback) {
    if (queue) {
	queue[0] = {
	    videoId: videoId,
	    videoNumber: videoNumber
	};
    } else {
	queue.push(videoId);
    }
    videoNumber++;
    callback();
}

function getQueue() {
    return {
	videoQueue: queue
    };
}

module.exports = {
    queueVideo: queueVideo,
    changeVideo: changeVideo,
    getQueue: getQueue
};
