'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();

var queue = [];

function queueVideo(videoId) {
    queue.push({
	videoId: videoId,
	videoNumber: -1
    });
    eventEmitter.emit('videoQueueStoreChanged');
}

function changeVideo(videoId) {
    if (queue) {
	queue[0] = ({
	    videoId: videoId,
	    videoNumber: -1
	});
    } else {
	queue.push({
	    videoId: videoId,
	    videoNumber: -1
	});
    }
    eventEmitter.emit('videoQueueStoreChanged');
}

function setQueue(videoQueue) {
    console.log('setting queue');
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
