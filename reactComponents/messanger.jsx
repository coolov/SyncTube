'use strict';

var React = require('react');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var messageStore = require('./../stores/messageStore');
var messageActions = require('./../actions/messageActions');

var MessageList = React.createClass({
  getInitialState: function() {
    return messageStore.getState();
  },
  componentDidMount: function() {
    var self = this;
    messageStore.onChange(function() {
      self.setState(messageStore.getState());
    })
  },
  render: function() {
    var messages = this.state.messageList.map(function(messageInfo) {
      return (
	<ul>
	  <li key={messageInfo.messageNumber}>{messageInfo.messageText}</li>
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
    messageActions.sendMessage(this.state.message);
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
  MessageList: MessageList,
  MessageInput: MessageInput
}
