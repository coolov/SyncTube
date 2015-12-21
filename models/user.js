var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var salt = require('./../settings').salt;

var User = mongoose.model('User', {
    username: String,
    password: String,
    isAdmin: Boolean
});

function validPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

function addUser(username, password) {
    var salt = bcrypt.genSaltSync();
    var hashedPW = bcrypt.hashSync(password, salt);
    var newUser = new User({
	username: username,
	password:hashedPW,
	salt: salt,
	isAdmin: false
    })
    newUser.save();
    return newUser
}

function getUser(username, callback) {
    User.findOne({username:username}, function(err, user) {
	if (err) {throw err;}
	callback(user);
    });
}

module.exports = {
    controller: {
	validPassword: validPassword,
	addUser: addUser,
	getUser: getUser
    }
};
