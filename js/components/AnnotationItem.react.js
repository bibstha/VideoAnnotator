var React = require('react');
var gravatar = require('gravatar');
var moment = require('moment');

var AnnotationItem = React.createClass({
  render: function() {
    var comment = this.props.comment;
    return (
      <div className='commentItem row'>
        <div className='col-md-3'>
          <img src={gravatar.url(comment.user_email, {s: 30})}/> <br/>
          <div className='time'>{moment().startOf('day').seconds(comment.get('time')).format('mm:ss')}</div>
        </div>
        <div className='col-md-9'>{comment.get('body')}</div>
      </div>
    );
  }
});

module.exports = AnnotationItem;
