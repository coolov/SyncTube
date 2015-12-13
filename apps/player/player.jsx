var ReactDOM = require('react-dom');
var React = require('react');
var Player = require('./../../reactModules/videoPlayer/videoPlayer.jsx');
var Messanger = require('./../../reactModules/messanger/messanger.jsx');

var Site = React.createClass({
  render: function() {
    console.log('rendering')
    return (
      <div>
	<Player.Player />
	<Messanger.Input />
	<Messanger.List />
      </div>
    );
  }
});

ReactDOM.render(
  <Site />,
  document.getElementById('content')
);
