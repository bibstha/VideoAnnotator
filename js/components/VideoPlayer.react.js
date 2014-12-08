var React = require('react');
var VAActions = require('../actions/VAActions');
var VideoPlayerStore = require('../stores/VideoPlayerStore');
var AnnotatorStore = require('../stores/AnnotatorStore');

var VideoPlayer = React.createClass({
  getInitialState: function() {
    return {video: null}
  },
  componentDidMount: function() {
    VideoPlayerStore.addChangeListener(this._onChange);
    VideoPlayerStore.addPlayerListener(this._onPlayerEventCallback);
    AnnotatorStore.addChangeListener(this._onAnnotatorChange);
    this._initializeVideoPlayer();
  },
  componentDidUnmount: function() {
    VideoPlayerStore.removeChangeListener(this._onChange);
    VideoPlayerStore.removePlayerListener(this._onPlayerEventCallback);
  },
  componentDidUpdate: function() {
    this._updateVideoPlayer();
  },
  render: function() {
    
    var title = (this.state.video !== null) ? this.state.video.get('title') : "Please select a video";
    var videoElement = '<video id="videoplayer" class="video-js vjs-default-skin vjs-big-play-centered" controls ' +
      'width="480" height="360"></video>';
    return (
      <div>
        <h4>Video Player</h4>
        <h3>{title}</h3>
        <div dangerouslySetInnerHTML={{__html: videoElement}} />
      </div>
    );
  },
  
  _onChange: function() {
    this.setState({video: VideoPlayerStore.getVideo()});
  },
  
  _onPlayerEventCallback: function(type, params) {
    switch (type) {
      case 'pause':
        this._pauseVideoPlayer();
        break;
        
      case 'seek':
        this._seekVideoPlayer(params);
        break;
        
    }
  },
  
  _onAnnotatorChange: function() {
    this._setMarkers();
  },
  
  _initializeVideoPlayer: function() {
    videojs('videoplayer', {}, function() {
    });
  },
  
  _updateVideoPlayer: function() {
    var video = this.state.video;
    if (video !== null) {
      var player = videojs('videoplayer').src(video.get('url'));
      // A closure to save last_time value
      var timeUpdateCallback = (function(time_gap) {
        var last_time = 0
        return function() {
          if (Math.abs(this.currentTime() - last_time) > time_gap) {
            last_time = this.currentTime();
            VAActions.updateVideoPlayerProgress({time: last_time});
          }
        }
      })(0.4); // only update at a 0.4 second interval
      
      player.on('timeupdate', timeUpdateCallback);
    }
  },
  
  _pauseVideoPlayer: function() {
    videojs('videoplayer').pause();
  },
  
  _seekVideoPlayer: function(params) {
    videojs('videoplayer').currentTime(params.current_time);
  },
  
  _setMarkers: function() {
    var video = videojs('videoplayer');
    var markers_times = AnnotatorStore.getComments().map(function(comment) { return comment.get('time')});
    var markers_texts = AnnotatorStore.getComments().map(function(comment) { return comment.get('body')});
    video.markers({
      setting: {
        forceInitialization: true
      },
      marker_breaks: markers_times,
      marker_text: markers_texts
    });
  }
});

module.exports = VideoPlayer;
