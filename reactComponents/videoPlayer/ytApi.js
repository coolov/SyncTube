/*
This was written by Github user helmutkian (https://github.com/helmutkian)

https://github.com/helmutkian/browserify-youtubeIframeApi
*/
var Q = require('q');

var apiDeferred = Q.defer();

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

function onYouTubeIframeAPIReady() {
  apiDeferred.resolve(window.YT);
}

function getYouTubeIframeApi(fn) {
    return apiDeferred.promise;
}

module.exports = getYouTubeIframeApi;
