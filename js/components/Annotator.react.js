var React = require('react');
var ReactPropTypes = React.PropTypes;
var AnnotatorStore = require('../stores/AnnotatorStore');
var VAActions = require('../actions/VAActions');

var Annotator = React.createClass({
  getInitialState: function() {
    return {video: null, comments: []};
  },
  componentDidMount: function() {
    AnnotatorStore.addChangeListener(this._onChange);
  },
  componentDidUnmount: function() {
    AnnotatorStore.removeChangeListener(this._onChange);
  },
  render: function() {
    var hasComments = (this.state.comments.length > 0)? true:false;
    var commentsForm = '';
    if (hasComments) {
      commentsForm = 
        <div htmlClass='new-comment'>
          <form onSubmit={this._handleSubmit}>
            <textarea ref='newComment' rows='3' cols='15'></textarea>
            <input type='submit' value='Annotate'></input>
          </form>
        </div>
    }
    return (
      <div>
        <div htmlClass='comments'>
          {this.state.comments.map(function(comment) {
            return <div key={comment.id}>{comment.get('body')}</div>;
          })}
        </div>
        {commentsForm}
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
          time: 15
        }
      );
      commentNode.value = '';
    }
  }
});

module.exports = Annotator;
