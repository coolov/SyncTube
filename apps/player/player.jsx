var ReactDOM = require('react-dom');
var React = require('react');
var Player = require('./../../reactComponents/videoPlayer.jsx');
var Messanger = require('./../../reactComponents/messanger.jsx');
var Login = require('./../../reactComponents/login.jsx');

var Site = React.createClass({
  render: function() {
    return (
      <div>
	<Player.Player />
	<Player.SyncButton />
	<Login.LoginForm />
	<Messanger.MessageInput />
	<Messanger.MessageList />
      </div>
    );
  }
});

ReactDOM.render(
  <Site />,
  document.getElementById('content')
);
