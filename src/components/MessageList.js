import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
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
                    {message.content}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default MessageList;
