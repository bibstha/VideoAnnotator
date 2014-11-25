var VideoSelector = React.createClass({
  getInitialState: function() {
    return {videos: []};
  },
  componentDidMount: function() {
    var videos = new VideoCollection();
    videos.fetch({
      success: function(collection) {
        this.setState({videos: collection});
      }.bind(this),
      error: function(collection, error) {
        console.warn(error)
      }.bind(this)
    });
  },
  handleVideoClick: function(video, e) {
    this.props.clickHandler(video);
  },
  render: function() {
    var videoItemNodes = this.state.videos.map(function(video) {
      return (
        <li><VideoItem video={video} clickHandler={this.handleVideoClick.bind(this, video)}></VideoItem></li>
      );
    }, this);
    
    return (
      <div className="videoSelector">
        <h2>List of Videos</h2>
        <ul class="videoList">
          {videoItemNodes}
        </ul>
      </div>
    );
  }
});

var VideoItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.clickHandler();
  },
  render: function() {
    return (
      <a onClick={this.handleClick}
      href={this.props.video.get('url')}>{this.props.video.get('title')}</a>
    );
  }
});

var VideoPlayer = React.createClass({
  componentDidMount: function() {
    
  },
  render: function() {
    console.log("VideoPlayer Render");
    if (this.props.video) {
      return (
        <div>
          <div class="player">
          </div>
        </div>
      );  
    } else {
      return (<div>No Video Found</div>);
    }
  }  
});

var GlobalComponent = React.createClass({
  handleVideoSelect: function() {
    
  },
  render: function() {
    return (
      <div>
        <VideoSelector clickHandler={this.handleVideoSelect}/>
        <VideoPlayer video={this.state.video} />
      </div>
    );
  }
});

React.render(
  <GlobalComponent/>,
  document.getElementById('videoBox')
);
