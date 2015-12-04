// npm imports
var React = require('react');
var ReactDOM = require('react-dom');

// Custom libs
var VideoController = require('./../../reactModules/videoController/videoController.jsx');

var Site = React.createClass({
  render: function() {
    return (
      <div>
	<VideoController.Controller queueVideoUrl="http://localhost:3000/adminAPI/queueVideo" />
      </div>
    );
  }
});

ReactDOM.render(
  <Site />,
  document.getElementById('content')
);
