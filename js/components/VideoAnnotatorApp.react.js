var React = require('react');
var VAStore = require('../stores/VAStore');
var VAActions = require('../actions/VAActions');
var VideoPlayer = require('./VideoPlayer.react');
var Annotator = require('./Annotator.react');

function getVideoAnnotatorState() {
  return {
    selectedVideo: VAStore.getSelectedVideo(),
    allVideos: VAStore.getAll()
  };
}
var VideoAnnotatorApp = React.createClass({
  
  getInitialState: function() {
    return getVideoAnnotatorState();
  },
  
  componentDidMount: function() {
    VAStore.addChangeListener(this._onChange);
  },
  
  componentDidUnmount: function() {
    VAStore.removeChangeListener(this._onChange);
  },
  
  render: function() {
    
    return (<div>
      {this.state.allVideos.map(function(video) {
        return (
          <div>
            <a onClick={this._onClickVideo.bind(this, video)} href="#">{video.get('title')}</a>
          </div>
        );
      }.bind(this))
      }
      <VideoPlayer></VideoPlayer>
      <Annotator></Annotator>
    </div>);
  },
  
  _onClickVideo: function(video, e) {
    e.preventDefault();
    VAActions.clickVideo(video);
  },
  
  // When store changes
  _onChange: function() {
    this.setState(getVideoAnnotatorState());
  }

});

module.exports = VideoAnnotatorApp;
