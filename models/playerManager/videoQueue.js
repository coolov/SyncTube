var videoQueue = ['8g2KKGgK-0w'];

function changeCurrentVideo(videoId) {
    console.log('Changing current video to: ', videoId);
    videoQueue.shift();
    videoQueue.unshift(videoId);
    console.log('Queue: ', videoQueue);
    return getCurrentVideo();
}

function getCurrentVideo() {
    return videoQueue[0];
}

function addVideoToQueue(videoId) {
    console.log('Queueing video: ', videoId);
    videoQueue.push(videoId);
    console.log('Queue: ', videoQueue);
}

module.exports = {
    changeCurrentVideo: changeCurrentVideo,
    getCurrentVideo: getCurrentVideo,
    addVideoToQueue: addVideoToQueue
}
