var React = require('react');
var VAActions = require('../actions/VAActions');
var VideoPlayerStore = require('../stores/VideoPlayerStore');

function initializeVideoPlayer(video) {
  if (video !== null) {
    console.log(video.get('url'));
    $("#videoplayer").flowplayer({
      playlist: [
        [
          { webm: video.get('url') }
        ]
      ],
      ratio: 3/4,   // video with 4:3 aspect ratio
      splash: true  // a splash setup
    });
  }
}

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
        <div>
          <h4>Video Player</h4>
          <h3>{this.state.video.get('title')}</h3>
          <div id="videoplayer"></div>
        </div>
      );
    } else {
      return (
        <div>
          <h4>Video Player</h4>
          <div>Please select a video.</div>
        </div>
      );
    }
  },
  componentDidUpdate: function() {
    initializeVideoPlayer(this.state.video);
  },
  
  _onChange: function() {
    this.setState({video: VideoPlayerStore.getVideo()});
  }
  
});

module.exports = VideoPlayer;
