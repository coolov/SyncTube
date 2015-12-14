var socket = require('socket.io-client')();

var ytPlayerStore = require('./../stores/ytPlayerStore');

function getPlayer(callback) {
    ytPlayerStore.createPlayer(callback)
}

function syncPlayer() {
    socket.emit('syncVideo');
}

module.exports = {
    getPlayer: getPlayer,
    syncPlayer: syncPlayer
}

socket.on('currentVideoChanged', function(newVideoInfo) {
    ytPlayerStore.setState(newVideoInfo);
});
