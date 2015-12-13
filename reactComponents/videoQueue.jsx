// npm imports
var React = require('react');
var request = require('request');
var socket = require('socket.io-client')();

var videoQueueActions = require('./../actions/videoQueueActions');
var videoQueueStore = require('./../stores/videoQueueStore');

var VideoQueue = React.createClass({
  getInitialState: function() {
    return videoQueueStore.getState();
  },
  componentDidMount: function() {
    var self = this;
    videoQueueStore.onChange(function() {
      self.setState(videoQueueStore.getState());
    });
  },
  render: function() {
    queue = this.state.videoQueue.map(function(videoInfo) {
      return(
	<li key={videoInfo.videoNumber}>{videoInfo.videoId}</li>
      )
    });

    return (
      <ol>
	{queue}
      </ol>
    );
  }
});

var QueueManager = React.createClass({
  getInitialState: function() {
    return {
      videoId: '',
      videoQueue: videoQueueStore.getState().videoQueue
    };
  },
  handleVideoIDChange: function(event) {
    this.setState({videoId: event.target.value});
  },
  changeVideo: function(event) {
    event.preventDefault();
    var videoId = this.state.videoId.trim();
    videoQueueActions.changeVideo(videoId);
  },
  queueVideo: function(event) {
    event.preventDefault();
    var videoId = this.state.videoId.trim();
    videoQueueActions.queue(videoId);
  },
  componentDidMount: function() {
    var self = this;
    videoQueueStore.onChange(function() {
      self.setState(videoQueueStore.getState);
    });
    videoQueueActions.getQueue();
  },
  render: function() {
    return (
      
      <div>
	<form>
	  <input
	    type="text"
	    placeholder="videoID"
	    value={this.state.videoID}
	    onChange={this.handleVideoIDChange}
	  />
	  <input type="button" value="Change Video" onClick={this.changeVideo} />
	  <input type="button" value="Queue Video" onClick={this.queueVideo} />
	</form>
	<VideoQueue queue={this.state.videoQueue} />
      </div>
    );
  }
});

module.exports = {
  QueueManager: QueueManager
}
