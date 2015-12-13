'use strict';

var request = require('request');
var socket = require('socket.io-client')();

var videoQueueStore = require('./../stores/videoQueueStore');

var siteUrl = 'http://localhost:3000';
var getQueueUrl = siteUrl + '/adminApi/getQueue';
var queueVideoUrl = siteUrl + '/adminApi/queueVideo';
var changeVideoUrl = siteUrl + '/adminApi/changeVideo';

function getQueue() {
    request.get(getQueueUrl, function(error, response, body) {
	if (!error && response.statusCode == 200) {
	    body = JSON.parse(body);
	    videoQueueStore.setQueue(body.videoQueue);
	}
    });
};

function changeVideo(videoId) {
    videoQueueStore.changeVideo(videoId);
    request.post({
	url: changeVideoUrl,
	form: {
	    videoId: videoId
	}},
	function(error, response, body) {
	    if (!error && response.statusCode == 200) {
		body = JSON.parse(body)
		videoQueueStore.setQueue(body.videoQueue);
	    }
	});
}

function queue(videoId) {
    videoQueueStore.queueVideo(videoId);
    request.post({
	url: queueVideoUrl,
	form: {
	    videoId: videoId
	}},
	function(error, response, body) {
	    if (!error && response.statusCode == 200) {
		body = JSON.parse(body)
		videoQueueStore.setQueue(body.videoQueue);
	    }
	});
}

module.exports = {
    queue: queue,
    changeVideo: changeVideo,
    getQueue: getQueue
};

socket.on('updateQueue', function() {
    getQueue();
});
