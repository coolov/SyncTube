var ReactDOM = require('react-dom');
var React = require('react');
var socket = require('socket.io-client')('http://localhost:3000');
var ytPlayer = require('./ytplayer.js');

var MessageList = React.createClass({
  render: function() {
    var messages = this.props.messages.map(function(chatMessage) {
      return (
	<li key={chatMessage.messageNumber}>{chatMessage.messageNumber}:{chatMessage.message}</li>
      );
    });
    return (
      <ul>
	{messages}
      </ul>
    )
  }
});

var MessageInput = React.createClass({
  getInitialState: function() {
    return {message: ''};
  },
  handleMessageChange: function(e) {
    this.setState({message: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var message = this.state.message.trim();
    this.props.sendMessage(message);
    this.setState({message:''});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
	<input
	  type="text"
	  placeholder="Message"
	  value={this.state.message}
	  onChange={this.handleMessageChange}
	/>
	<input type="submit" value="Send" />
      </form>
    );
  }
});

var Messenger = React.createClass({
  getInitialState: function() {
    return {messages: []};    
  },
  updateMessages: function(messageList) {
    this.setState({messages:messageList});
  },
  componentDidMount: function(e) {
    socket.emit('getMessages');
    socket.on('messageList', this.updateMessages);
  },
  sendMessage: function(message) {
    socket.emit('newMessage', message);
  },
  render: function() {
    return (
      <div>
	<MessageList messages={this.state.messages}/>
	<MessageInput sendMessage={this.sendMessage}/>
      </div>
    );
  }
});

var Player = React.createClass({
  componentDidMount: function() {
    socket.on('newVideo', function(videoId) {
      ytPlayer.changeVideo(videoId);
    });

    socket.on('setCurrentVideo', function(videoId) {
      ytPlayer.changeVideo(videoId, function() {
	socket.emit('getVideoStartTime');
      });
    });

    socket.on('syncVideo', function(videoStartTime) {
      console.log(videoStartTime);
      timeDiffInMilliSeconds = Date.now() - videoStartTime;
      timeDiffInSeconds = Math.trunc(timeDiffInMilliSeconds/1000);
      ytPlayer.setTime(timeDiffInSeconds);
    });

    ytPlayer.getPlayer(function() {
      socket.emit('getCurrentVideo');
    });
  },
  render: function() {
    return (
	<div id="player"></div>
    );
  }
});

var Site = React.createClass({

  render: function() {
    return (
      <div>
	<Player />
	<Messenger />
      </div>
    );
  }
});

ReactDOM.render(
  <Site />,
  document.getElementById('content')
);
