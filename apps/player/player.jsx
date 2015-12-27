var ReactDOM = require('react-dom');
var React = require('react');
var Player = require('./../../reactComponents/videoPlayer.jsx');
var Messanger = require('./../../reactComponents/messanger.jsx');
var Login = require('./../../reactComponents/login.jsx');
var userStore = require('./../../stores/userStore');
var userActions= require('./../../actions/userActions');

var App = React.createClass({
  getInitialState: function() {
    return {
      user: null
    }
  },
  componentDidMount: function() {
    var self = this;
    userStore.onChange(function() {
      self.setState(userStore.getState());
    });
    userActions.login(null, null);
  },
  loginFormSubmit: function(username, password) {
    console.log(username);
    console.log(password);
    userActions.login(username, password);
  },
  render: function() {
    var user = this.state.user;
    var loginForm = user ? null : <Login.LoginForm loginSubmit={this.loginFormSubmit} />;
    var username = user ? <h1>{user.username}</h1> : null
    return (
      <div>
	<Player.Player />
	<Player.SyncButton />
	{username}
	{loginForm}
	<Messanger.MessageInput />
	<Messanger.MessageList />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
