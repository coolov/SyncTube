'use strict';

var socket = require('socket.io-client')()
var messageStore = require('./../stores/messageStore');

function sendMessage(message) {
    messageStore.addMessage(message);
    socket.emit('sendMessage', message);
}

module.exports = {
    sendMessage: sendMessage
}
