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
    return {selectedVideo: null, allVideos: []};
  },
  
  componentDidMount: function() {
    VAStore.addChangeListener(this._onChange);
  },
  
  componentDidUnmount: function() {
    VAStore.removeChangeListener(this._onChange);
  },
  
  render: function() {
    return (<div className='row'>
      <div className='col-md-3'>
        <h4>Available Videos</h4>
        <ol>
        {this.state.allVideos.map(function(video) {
          return (
            <li>
              <a onClick={this._onClickVideo.bind(this, video)} href="#">{video.get('title')}</a>
            </li>
          );
        }.bind(this))
        }
        </ol>
      </div>
      <div className='col-md-6'>
        <VideoPlayer></VideoPlayer>
      </div>
      <div className='col-md-3'>
        <Annotator></Annotator>
      </div>
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
