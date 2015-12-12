var React = require('react')
var socket = require('socket.io-client')();
var events = require('events');
var eventEmitter = new events.EventEmitter();


var MessageList = React.createClass({
  getInitialState: function() {
    return {
      messageList: []
    };
  },
  componentDidMount: function() {
    var self = this;
    socket.on('newMessage', function(message) {
      var messageList = self.state.messageList;
      listSize = messageList.length;
      messageList.push({
	messageText: message,
	messageNum: listSize
      });
      self.setState({messageList: messageList});
    });
    eventEmitter.on('sentMessage', function(message) {
      var messageList = self.state.messageList;
      listSize = messageList.length;
      messageList.push({
	messageText: message,
	messageNum: listSize
      });
      self.setState({messageList: messageList});
    });
  },
  render: function() {
    messages = this.state.messageList.map(function(messageInfo) {
      return (
	<ul>
	  <li key={messageInfo.messageNum}>{messageInfo.messageText}</li>
	</ul>
      )});
    return (
      <ul>
	{messages}
      </ul>
    );
  }
});

var MessageInput = React.createClass({
  getInitialState: function() {
    return {
      message: ''
    };
  },
  handleMessageChange: function(event) {
    this.setState({message: event.target.value});
  },
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.state.message;
    socket.emit('sendMessage', message);
    eventEmitter.emit('sentMessage', message);
    this.setState({message: ''});
  },
  render: function() {
    return(
      <form onSubmit={this.handleMessageSend}>
	<input type="text" value={this.state.message} onChange={this.handleMessageChange} />
	<button type="Submit">Send</button>
      </form>
    );
  }
});

module.exports = {
  Input: MessageInput,
  List: MessageList
}
