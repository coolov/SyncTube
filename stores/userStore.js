'use strict';

var events = require('events');
var eventEmitter = new events.EventEmitter();

var user = null;

function setUser(userState) {
    user = userState;
    eventEmitter.emit('userStoreChanged');
}

function getState() {
    return user;
}

function onChange(callback) {
    eventEmitter.on('userStoreChanged', callback);
}

module.exports = {
    setUser: setUser,
    getState: getState,
    onChange: onChange
}
