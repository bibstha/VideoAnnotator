var React = require('react');
var ReactPropTypes = React.PropTypes;
var AnnotatorStore = require('../stores/AnnotatorStore');
var VAActions = require('../actions/VAActions');
var AnnotationItem = require('./AnnotationItem.react');

var Annotator = React.createClass({
  getInitialState: function() {
    return {video: null, comments: [], videoTime: 0};
  },
  componentDidMount: function() {
    AnnotatorStore.addChangeListener(this._onChange);
    var timeUpdater = setInterval((function() {
      this.setState({videoTime: Math.floor(AnnotatorStore.getVideoTime())});
    }).bind(this), 1000);
    this.setState({timeUpdater: timeUpdater});
  },
  componentDidUnmount: function() {
    AnnotatorStore.removeChangeListener(this._onChange);
    clearInterval(this.state.timeUpdater);
  },
  render: function() {
    var hasComments = (this.state.comments.length > 0)? true:false;
    var commentsForm = '';
    if (this.state.video !== null) {
      commentsForm = 
        <div htmlClass='new-comment'>
          <form onSubmit={this._handleSubmit}>
            <textarea ref='newComment' rows='3' cols='15' onChange={this._handleCommentChange}></textarea>
            <input type='submit' value='Annotate'></input>
          </form>
        </div>;
    }
      
    var visibleComments = this.state.comments.filter(function(comment) {
      return (this.state.videoTime >= comment.get('time'));
    }, this);
    
    var commentNodes = '';
    if (hasComments) {
      commentNodes = 
        <div>
          <div>Showing {visibleComments.length} of {this.state.comments.length} annotations.</div>
          <div htmlClass='comments'>
            {
              visibleComments.map(function(comment) {
                return <AnnotationItem comment={comment} key={comment.id} currentTime={this.state.videoTime}/>;
              }, this)
            }
          </div>
        </div>;
    } else {
      commentNodes = <div>No annotations yet. Please add one.</div>;
    }
    
    return (
      <div className='annotator-box'>
        <h4>Annotations</h4>
        <AnnotatorMetadata/>
        {commentNodes}
        {commentsForm}
        <div>Time: {this.state.videoTime}</div>
      </div>
    );
  },
  
  _onChange: function() {
    this.setState({video: AnnotatorStore.getVideo(), comments: AnnotatorStore.getComments()});
  },
  
  _handleSubmit: function(e) {
    e.preventDefault();
    var commentNode = this.refs.newComment.getDOMNode();
    var comment = commentNode.value.trim();
    if (comment !== '') {
      VAActions.createComment(
        {
          video: this.state.video,
          user_email: 'bibekshrestha@gmail.com',
          body: comment,
          time: this.state.videoTime
        }
      );
      commentNode.value = '';
    }
  },
  
  _handleCommentChange: function(e) {
    VAActions.pauseVideoPlayer();
  }
});

module.exports = Annotator;
