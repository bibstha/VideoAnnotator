var React = require('react');

var ChatItem = React.createClass({
  render: function() {
    return (
      <li className='chat-item'>
      <img className='chat-gravatar' src='https://www.gravatar.com/avatar/fce9c9c5dc42d98e71856d166e984e96?s=40&d=identicon'/>
      <div className='chat-text'>
      Lorem ipsum dosier {this.props.text}
      </div>
      <div className='chat-metadata'>
      <div className='chat-time'>Posted 5 hours ago by <span className='chat-author'>Bibek Shrestha</span></div>
      </div>
      </li>
    );
  }
});

var ChatList = React.createClass({
  getInitialState: function() {
    return ({
      chatItemCount: this.props.chatItemCount,
      scrollEnabled: true
    });
  },
  render: function() {
    return (
      <ul className='chat-item-list' ref="chatitemlist">
      {Array.apply(0, Array(this.state.chatItemCount)).map(function(o, i, a) {
        return (<ChatItem text={i} key={i}/>);
      })}
      </ul>
    );
  },
  componentDidMount: function() {
    this.scrollBottom();
  },
  componentDidUpdate: function() {
    this.scrollBottom();
  },
  addChat: function(args) {
    this.setState({chatItemCount: this.state.chatItemCount + 1});
  },
  scrollBottom: function() {
    if (this.state.scrollEnabled) {
      var commentBox = this.refs.chatitemlist.getDOMNode()
      commentBox.scrollTop = commentBox.scrollHeight;
    }
  }
});

var ChatForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.refs.commentbox.getDOMNode().value != '') {
      this.props.onSubmit({value: this.refs.commentbox.getDOMNode().value});
      this.refs.commentbox.getDOMNode().value = '';
    }
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className='chat-form'>
      <div>
      <textarea rows='3' ref='commentbox'></textarea>
      <input type='submit' value='Send'></input>
      </div>
      </form>
    );
  }
});

var ChatBox = React.createClass({
  getInitialState: function() {
    return ({chatItemCount: 8});
  },
  render: function() {
    return (
      <div>
      <ChatList chatItemCount={this.state.chatItemCount} ref='chatList'/>
      <ChatForm onSubmit={this.handleChatSubmit}/>
      </div>
    );
  },
  handleChatSubmit: function(args) {
    this.refs.chatList.addChat(args);
  }
});

module.exports = ChatBox;
