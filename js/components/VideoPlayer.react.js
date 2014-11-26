var React = require('react');
var VAActions = require('../actions/VAActions');
var VideoPlayerStore = require('../stores/VideoPlayerStore');

var VideoPlayer = React.createClass({
  getInitialState: function() {
    return {video: null}
  },
  componentDidMount: function() {
    VideoPlayerStore.addChangeListener(this._onChange);
    VideoPlayerStore.addPlayerListener(this._onPlayerEventCallback);
    this.initializeVideoPlayer();
  },
  componentDidUnmount: function() {
    VideoPlayerStore.removeChangeListener(this._onChange);
    VideoPlayerStore.removePlayerListener(this._onPlayerEventCallback);
  },
  componentDidUpdate: function() {
    this.updateVideoPlayer();
  },
  render: function() {
    
    var title = (this.state.video !== null) ? this.state.video.get('title') : "Please select a video";
    return (
      <div>
        <h4>Video Player</h4>
        <h3>{title}</h3>
        <video id="videoplayer" className="video-js vjs-default-skin vjs-big-play-centered" controls 
          width="480" height="360"></video>
      </div>
    );
  },
  
  _onChange: function() {
    this.setState({video: VideoPlayerStore.getVideo()});
  },
  
  _onPlayerEventCallback: function(type) {
    switch (type) {
      case 'pause':
        this.pauseVideoPlayer();
        break;
        
    }
  },
  
  initializeVideoPlayer: function() {
    videojs('videoplayer', {}, function() {
      console.log("Video Player Initialized!!");
    });
  },
  
  updateVideoPlayer: function() {
    var video = this.state.video;
    if (video !== null) {
      var player = videojs('videoplayer').src(video.get('url'));
      
      // A closure to save last_time value
      var timeUpdateCallback = (function(time_gap) {
        var last_time = 0
        return function() {
          if (this.currentTime() - last_time > time_gap) {
            last_time = this.currentTime();
            VAActions.updateVideoPlayerProgress({time: last_time});
          }
        }
      })(0.4); // only update at a 0.4 second interval
      
      player.on('timeupdate', timeUpdateCallback);
    }
  },
  
  pauseVideoPlayer: function() {
    videojs('videoplayer').pause();
  }
});

module.exports = VideoPlayer;
