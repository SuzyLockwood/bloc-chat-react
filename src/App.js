import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDmugZ1lWwb2InjosOVa9FK-cn26oPtlTs',
  authDomain: 'bloc-chat-react-suzy-lockwood.firebaseapp.com',
  databaseURL: 'https://bloc-chat-react-suzy-lockwood.firebaseio.com',
  projectId: 'bloc-chat-react-suzy-lockwood',
  storageBucket: 'bloc-chat-react-suzy-lockwood.appspot.com',
  messagingSenderId: '811413210799'
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activeRoom: '' };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <div className="app">
        <h1 className="appTitle">Welcome to the Bloc React Chat Application</h1>
        <div className="sidebar">
          <div className="appLogin">
            <User
              firebase={firebase}
              setUser={this.setUser}
              currentUser={this.state.user}
            />
          </div>
          <p>Select a Room:</p>
          <RoomList
            firebase={firebase}
            setActiveRoom={this.setActiveRoom}
            activeRoom={this.state.activeRoom}
          />
        </div>
        <div className="appMessage">
          <img
            src="https://images.pexels.com/photos/1162964/pexels-photo-1162964.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            className="RoomList-logo"
            alt="People Holding Chat Bubbles"
            width={600}
          />
          <h2> You are in Chat Room: {this.state.activeRoom.name} </h2>
          {/*
            Conditional that defaults to null if no Active Room is present.
            If room selected from RoomList, then retrieve MessageList.
            */}
          {this.state.activeRoom ? (
            <MessageList
              firebase={firebase}
              setActiveRoom={this.state.activeRoom.key}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
