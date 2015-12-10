// npm imports
var React = require('react');
var socket = require('socket.io-client')();

// Custom libs
var ytPlayer = require('./ytPlayer.js');

var Player = React.createClass({
  registerSocketCommands: function(callback) {
    var self = this;
    socket.on('changeVideo', function(videoId) {
      ytPlayer.changeVideo(videoId, function() {
	self.syncVideo();
      });
    });
    socket.on('syncVideo', function(startTime) {
      timeDiff = (Date.now() - startTime)/1000;
      ytPlayer.setTime(timeDiff);
    });
    callback();
  },
  getCurrentVideo: function() {
    socket.emit('getCurrentVideo');
  },
  syncVideo: function() {
    socket.emit('syncMe');
  },
  playerMounted: function() {
    this.registerSocketCommands(function() {
      this.getCurrentVideo();
    }.bind(this));
  },
  componentDidMount: function () {
    ytPlayer.getPlayer(this.playerMounted);
  },
  render: function() {
    return (
      <div>
	<div id="player"></div>
	<button type="button" onClick={this.syncVideo}>Sync Video</button>
      </div>
    );
  }
});

module.exports = {
  Player: Player
}
