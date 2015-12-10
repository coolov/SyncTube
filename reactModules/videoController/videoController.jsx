// npm imports
var React = require('react');
var request = require('request');

var VideoQueue = React.createClass({
  render: function() {
    queue = this.props.queue.map(function(videoInfo) {
      return(
	<li key={videoInfo.queueNumber}>{videoInfo.videoId}</li>
      )
    });

    return (
      <ol>
	{queue}
      </ol>
    );
  }
});

var VideoController = React.createClass({
  getInitialState: function() {
    return {
      videoID: '',
      videoQueue: []
    };
  },
  handleVideoIDChange: function(event) {
    this.setState({videoID: event.target.value});
  },
  changeVideo: function(event) {
    event.preventDefault();
    var videoId = this.state.videoID.trim();
    var that = this;
    queue = this.state.videoQueue;
    queue[0] = {
      videoId: videoId,
      runTimeInMilliseconds: 10000,
      queueNumber: this.state.videoQueue.length
    };
    this.setState({videoQueue: queue});
    request.post({
      url: 'http://localhost:3000/adminAPI/changeVideo',
      form: {
	videoId: videoId
      }},
      function(err, httpResponse, body) {
	var response = JSON.parse(body);
	that.setState({videoQueue: response.videoQueue});
      }
    );
  },
  queueVideo: function(event) {
    event.preventDefault();
    var videoId = this.state.videoID.trim();
    var that = this;
    queue  = this.state.videoQueue;
    queue.push({
      videoId: videoId,
      runTimeInMilliseconds: 10000,
      queueNumber: this.state.videoQueue.length
    });
    this.setState({videoQueue: queue});
    request.post({
      url: 'http://localhost:3000/adminAPI/queueVideo',
      form: {
	videoId: videoId
      }},
      function(err, httpResponse, body) {
	var response = JSON.parse(body);
	that.setState({videoQueue: response.videoQueue});
      }
    );
  },
  componentDidMount: function() {
    var that = this;
    request.get('http://localhost:3000/adminAPI/getQueue',
      function(err, httpResponse, body) {
	var response = JSON.parse(body);
	that.setState({videoQueue: response.videoQueue});
      }
    );
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
  Controller: VideoController,
}
