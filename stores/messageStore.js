'use strict';

var socket = require('socket.io-client')();
var events = require('events');
var eventEmitter = new events.EventEmitter();

var messageList = [];

function addMessage(message) {
    var listLength = messageList.length;
    messageList.push({
	messageNumber: listLength,
	messageText: message
    });
    eventEmitter.emit('messageStoreChanged');
}

function getState() {
    return {
	messageList: messageList
    };
}

function onChange(callback) {
    eventEmitter.on('messageStoreChanged', callback);
}
 
module.exports = {
    addMessage: addMessage,
    getState: getState,
    onChange: onChange
};

socket.on('newMessage', function(message) {
    addMessage(message);
});

