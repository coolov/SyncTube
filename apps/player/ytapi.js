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
