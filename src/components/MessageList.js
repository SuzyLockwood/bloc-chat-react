import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.state = {
      messages: [],
      username: '',
      content: '',
      sentAt: '',
      roomId: ''
    };
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });
    this.setState({ username: '', content: '', sentAt: '', roomId: '' });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: !this.props.currentUser
        ? 'Guest'
        : this.props.currentUser.displayName,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.setActiveRoom
    });
  }

  render() {
    return (
      <div className="messageApp">
        <div className="messageArea" />
        <div>
          <ul>
            {/*
            Filters messages that are associated with the active room.
            Then uses map to return message content in a list.
            */}
            {this.state.messages.map(message => {
              if (message.roomId === this.props.setActiveRoom) {
                return (
                  <li className="messageContent" key={message.key}>
                    {message.username}: {message.content}
                  </li>
                );
              }
            })}
          </ul>
          <form onSubmit={this.createMessage}>
            <input
              type="text"
              value={this.state.content}
              onChange={this.handleChange}
              placeholder="Enter your message"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
