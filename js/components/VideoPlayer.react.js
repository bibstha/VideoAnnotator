var React = require('react');
var VAActions = require('../actions/VAActions');
var VideoPlayerStore = require('../stores/VideoPlayerStore');

var VideoPlayer = React.createClass({
  getInitialState: function() {
    return {video: null}
  },
  componentDidMount: function() {
    VideoPlayerStore.addChangeListener(this._onChange);
  },
  componentDidUnmount: function() {
    VideoPlayerStore.removeChangeListener(this._onChange);
  },
  render: function() {
    if (this.state.video !== null) {
      return (
        <div id="videoplayer"></div>
      );
    } else {
      return (
        <div>Please select a video.</div>
      );
    }
  },
  
  _onChange: function() {
    var newVideo = VideoPlayerStore.getVideo();
    this.setState({video: newVideo});
    $("#videoplayer").flowplayer({
      playlist: [
        [{ webm:    newVideo.get('url') }]
      ],
      ratio: 3/4,   // video with 4:3 aspect ratio
      splash: true  // a splash setup
    });
  }
  
});

module.exports = VideoPlayer;
