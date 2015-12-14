var ReactDOM = require('react-dom');
var React = require('react');
var Player = require('./../../reactComponents/videoPlayer.jsx');
var Messanger = require('./../../reactComponents/messanger.jsx');

var Site = React.createClass({
  render: function() {
    return (
      <div>
	<Player.Player />
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
