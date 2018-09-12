import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.state = {
      rooms: [],
      newRoomName: ''
    };
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoomName) {
      return;
    }
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: '' });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <div className="chatApp">
        <div className="chooseActiveRoom">
          {this.state.rooms.map(room => (
            <p key={room.key} onClick={() => this.props.setActiveRoom(room)}>
              {room.name}
            </p>
          ))}
        </div>
        <div className="createRoomForm">
          <form onSubmit={e => this.createRoom(e)}>
            <input
              type="text"
              placeholder="...or enter a Room Name"
              value={this.state.newRoomName}
              onChange={e => this.handleChange(e)}
            />
            <input type="submit" value="Create New Room" />
          </form>
        </div>
      </div>
    );
  }
}

export default RoomList;
