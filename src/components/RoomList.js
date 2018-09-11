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

  handleRoomChange(e) {
    this.setState({ newRoomName: e.target.value });
  }

  render() {
    return (
      <div className="RoomList">
        <header className="RoomList-header">
          <img
            src="https://images.pexels.com/photos/1162964/pexels-photo-1162964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            className="RoomList-logo"
            alt="People Holding Chat Bubbles"
            width={600}
          />
          <h1 className="RoomList-title">Bloc Chat Rooms</h1>
          <table>
            <thead>
              <tr>
                <th>Room ID </th>
                <th>Room Name </th>
              </tr>
            </thead>
            <tbody>
              {this.state.rooms.map(room => (
                <tr key={room.key}>
                  <td>{room.key}</td>
                  <td>{room.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <form onSubmit={e => this.createRoom(e)}>
            <input
              type="text"
              id="newRoomName"
              onChange={e => this.handleRoomChange(e)}
              value={this.state.newRoom}
            />
            <button type="submit">Create New Room</button>
          </form>
        </header>
      </div>
    );
  }
}

export default RoomList;
