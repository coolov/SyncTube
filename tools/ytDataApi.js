'use strict';

var https = require('https');

var apiKeyHolder = require('./../apiKeys');

function ISO8601DurationToMilliseconds(durationString) {
    var timeUnitMultipliers = {
	'H': 3600,
	'M': 60,
	'S': 1
    }
    var durations = durationString.match(/[0-9]+[HMS]/g);
    var durationInSeconds = 0;
    durations.forEach(function(duration) {
	var timeUnit = duration.charAt(duration.length - 1);
	var amount = parseInt(duration.slice(0, duration.length - 1));
	durationInSeconds += amount * timeUnitMultipliers[timeUnit];
    });

    var durationInMilliseconds = durationInSeconds * 1000
    return durationInMilliseconds;
}

function getVideoProperties(videoId, properties, callback) {
    getVideoInfo(videoId, function(videoInfo) {
	var requestedProperties = {}
	requestedProperties.videoId = videoId;
	properties.forEach(function(propertyName) {
	    switch (propertyName) {
	    case 'title':
		requestedProperties.title = videoInfo.snippet.title
		break;
	    case "runTime":
		var videoDurationInISO8601 = videoInfo.contentDetails.duration;
		var durationInMilliseconds = ISO8601DurationToMilliseconds(videoDurationInISO8601);
		requestedProperties.runTime = durationInMilliseconds;
		break;
	    default:
		break;
	    }
	});
	callback(requestedProperties);
    });
}

function getVideoInfo(videoId, callback) {
    var searchUrl ='https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&part=contentDetails,snippet&key=' + apiKeyHolder.ytDataApiKey()
    https.get(searchUrl, function(response) {
	var str = '';
	response.on('data', function (chunk) {
	    str += chunk;
	});
	response.on('end', function () {
	    var videoInfo = JSON.parse(str).items[0];
	    callback(videoInfo);
	});
    });
}


module.exports = {
    getVideoProperties: getVideoProperties
}
