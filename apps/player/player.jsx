var ReactDOM = require('react-dom');
var React = require('react');
var Player = require('./../../reactModules/videoPlayer/videoPlayer.jsx');

/*
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
*/

var Site = React.createClass({
  render: function() {
    console.log('rendering')
    return (
      <div>
	<Player.Player />
      </div>
    );
  }
});

ReactDOM.render(
  <Site />,
  document.getElementById('content')
);
