// npm imports
var React = require('react');
var socket = require('socket.io-client')();

// Custom libs
var ytPlayerStore = require('./../stores/ytPlayerStore');
var ytPlayerActions = require('./../actions/ytPlayerActions');

var Player = React.createClass({
  syncVideo: function(event) {
    event.preventDefault();
    ytPlayerActions.syncPlayer();
  },
  componentDidMount: function () {
    ytPlayerActions.getPlayer(ytPlayerActions.syncPlayer);
  },
  render: function() {
    return (
      <div>
	<div id="player"></div>
	<div></div>
	<button type="button" onClick={this.syncVideo}>Sync Video</button>
      </div>
    );
  }
});

module.exports = {
  Player: Player
}
