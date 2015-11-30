var https = require('https');

function getVideoLengthInMilliseconds(videoId, callback) {
    searchUrl ='https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&part=contentDetails&key=AIzaSyB6-5X-tsJHnH0HT8E63y_BzyG3KL5vcRk'
    https.get(searchUrl, function(response) {
	var str = '';
	response.on('data', function (chunk) {
	    str += chunk;
	});
	response.on('end', function () {
	    var videoInfo = JSON.parse(str).items[0];
	    var videoDurationInISO8601 = videoInfo.contentDetails.duration;
	    var durationInMilliseconds = ISO8601DurationToMilliseconds(videoDurationInISO8601);
	    callback(durationInMilliseconds);
	});
    });
}

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

    durationInMilliseconds = durationInSeconds * 1000
    return durationInMilliseconds;
}

module.exports = {
    getVideoLengthInMilliseconds: getVideoLengthInMilliseconds
}
