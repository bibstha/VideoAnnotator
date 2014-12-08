var React = require('react');
var AnnotatorStore = require('../stores/AnnotatorStore');
var VAActions = require('../actions/VAActions');

var AnnotationForm = React.createClass({
  getInitialState: function() {
    return ({video: undefined})
  },
  componentDidMount: function() {
    AnnotatorStore.addChangeListener(this._onAnnotatorStoreChange);
  },
  render: function() {
    if (this.state.video === undefined) {
      return <div></div>;
    } else {
      return (
        <form onSubmit={this._handleSubmit} className='chat-form'>
          <textarea ref='newComment' rows='3' cols='15' onChange={this._handleCommentChange}></textarea>
          <input type='submit' value='Add'></input>
        </form>
      );
    }
  },
  _onAnnotatorStoreChange: function() {
    this.setState({ video: AnnotatorStore.getVideo() });
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
          time: Math.floor(AnnotatorStore.getVideoTime())
        }
      );
      commentNode.value = '';
    }
  },
  _handleCommentChange: function(e) {
    VAActions.pauseVideoPlayer();
  }
});

module.exports = AnnotationForm;
