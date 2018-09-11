import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <React-Fragment>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Bloc React Chat Application</h1>
        </header>
        <div className="App-intro">
          <RoomList firebase={firebase} />
        </div>
      </React-Fragment>
    );
  }
}

export default App;
