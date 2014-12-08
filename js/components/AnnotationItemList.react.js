var React = require('react');
var AnnotationItem = require('./AnnotationItem.react');
var AnnotatorStore = require('../stores/AnnotatorStore');

var AnnotationItemList = React.createClass({
  getInitialState: function() {
    return ({
      video: undefined, comments: [], videoTime: 0, timeUpdater: undefined,
      scrollEnabled: true
    });
  },
  componentDidMount: function() {
    AnnotatorStore.addChangeListener(this._onChange);
    this._initializeTimeUpdater();
  },
  componentDidUnmount: function() {
    clearInterval(this.state.timeUpdater);
  },
  componentDidUpdate: function() {
    this._scrollBottom();
  },
  render: function() {
    if (this.state.video === undefined) {
      return (<div></div>)
    } else {
      return (
        <div>
          {this._renderMetadata()}
          {this._renderAnnotationList()}
          {this._renderControls()}
        </div>
      );
    }
  },
  _renderMetadata: function() {
    var visibleComments = this.state.comments.filter(function(comment) {
      return (this.state.videoTime >= comment.get('time'));
    }, this);
    return (
      <div>Showing {visibleComments.length} of {this.state.comments.length} annotations.</div>
    );
  },
  _renderAnnotationList: function() {
    var visibleComments = this.state.comments.filter(function(comment) {
      return (this.state.videoTime >= comment.get('time'));
    }, this);
    return (
      <ul className='chat-item-list' ref='chatitemlist'>{
        visibleComments.map(function(comment) {
          return <AnnotationItem comment={comment} key={comment.id} currentTime={this.state.videoTime}/>;
        }, this)
      }</ul>
    );
  },
  _renderControls: function() {
    return (
      <div className='chat-controls'>
        <div>
          <span>Auto scroll {this.state.scrollEnabled ? "enabled " : "disabled "}</span>
          (<a href='#' onClick={this._handleScrollToggle}>{this.state.scrollEnabled ? "Disable" : "Enable"}</a>)
        </div>
        <div>Video at {this.state.videoTime} seconds</div>
      </div>
    );
  },
  _handleScrollToggle: function() {
    this.setState({scrollEnabled: !this.state.scrollEnabled});
  },
  _scrollBottom: function() {
    if (this.state.scrollEnabled && this.refs.chatitemlist !== undefined) {
      var commentBox = this.refs.chatitemlist.getDOMNode()
      commentBox.scrollTop = commentBox.scrollHeight;
    }
  },
  _onChange: function() {
    this.setState({
      video: AnnotatorStore.getVideo(),
      comments: AnnotatorStore.getComments()
    });
    
  },
  _initializeTimeUpdater: function() {
    var timeUpdater = setInterval((function() {
      this.setState({videoTime: Math.floor(AnnotatorStore.getVideoTime())});
    }).bind(this), 500);
    this.setState({timeUpdater: timeUpdater});
  }
});

module.exports = AnnotationItemList;
