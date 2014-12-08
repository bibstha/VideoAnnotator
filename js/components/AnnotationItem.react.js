var React = require('react');
var gravatar = require('gravatar');
var moment = require('moment');
var VAActions = require('../actions/VAActions');

var AnnotationItem = React.createClass({
  render: function() {
    var comment = this.props.comment;
    return (
      <div className='chat-item' onClick={this._handleClick}>
        <img src={gravatar.url(comment.user_email, {s: 30})}/>
        <div>{comment.get('body')}</div>
        <div className='chat-metadata'>{moment().startOf('day').seconds(comment.get('time')).format('mm:ss')}</div>
      </div>
    );
  },
  _handleClick: function() {
    VAActions.seekVideoPlayer({current_time: this.props.comment.get('time')});
  }
});

module.exports = AnnotationItem;
