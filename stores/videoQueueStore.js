'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();

var queue = [];

function queueVideo(videoId) {
    queue.push({
	videoId: videoId,
	videoTitle: "Fetching Title...",
	runTimeInMilliseconds: -1,
	videoNumber: -1
    });
    eventEmitter.emit('videoQueueStoreChanged');
}

function changeVideo(videoId) {
    if (queue) {
	queue[0] = ({
	    videoId: videoId,
	    videoTitle: "Fetching Title...",
	    runTimeInMilliseconds: -1,
	    videoNumber: -1
	});
	eventEmitter.emit('videoQueueStoreChanged');
    } else {
	queueVideo(videoId)
    }
}

function setQueue(videoQueue) {
    queue = videoQueue;
    eventEmitter.emit('videoQueueStoreChanged');
}

function getState() {
    return {
	videoQueue: queue
    };
}

function onChange(callback) {
    eventEmitter.on('videoQueueStoreChanged', callback);
}

module.exports = {
    queueVideo: queueVideo,
    changeVideo: changeVideo,
    setQueue: setQueue,
    getState: getState,
    onChange: onChange
};
