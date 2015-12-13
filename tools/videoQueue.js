'use strict';

var ytDataApi = require('./ytDataApi');

var queue = [];
var videoNumber = 0;
var videoStartTime = 0;

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
	    videoStartTime = Date.now();
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
	    videoStartTime = Date.now()
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
    getQueue: getQueue
};
