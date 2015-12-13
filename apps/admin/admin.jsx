// npm imports
var React = require('react');
var ReactDOM = require('react-dom');

// Custom libs
var VideoQueue = require('./../../reactComponents/videoQueue.jsx');

var Site = React.createClass({
  render: function() {
    return (
      <div>
	<VideoQueue.QueueManager />
	<VideoQueue.QueueList />
      </div>
    );
  }
});

ReactDOM.render(
  <Site />,
  document.getElementById('content')
);
