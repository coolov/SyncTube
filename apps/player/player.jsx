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
  login: function(username, password) {
    userActions.login(username, password);
  },
  logout: function() {
    userActions.logout();
  },
  render: function() {
    var user = this.state.user;
    console.log(user);
    var authArea =  this.state.user ? <Login.LogoutButton logout={this.logout} /> : <Login.LoginForm login={this.login} />;
    var username = this.state.user ? <h1>{user.username}</h1> : "Not Logged In";
    return (
      <div>
	<Player.Player />
	<Player.SyncButton />
	{username}
	{authArea}
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
