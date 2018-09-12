import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    });
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  render() {
    return (
      <div className="userLogin">
        <p>You are logged in as:</p>
        {/*
            Conditional that changes the username displayed upon login
            or else displays "Guest".
            */}
        <h3>
          {' '}
          {this.props.currentUser
            ? this.props.currentUser.displayName
            : 'Guest'}
        </h3>
        {/*
            Conditional that changes the signIn button if there's a
            user logged in to "Sign Out" with a signOut method.
            */}
        <div className="userLoginButton">
          {this.props.currentUser === null ? (
            <button onClick={() => this.signIn()}>Sign In</button>
          ) : (
            <button onClick={() => this.signOut()}>Sign Out</button>
          )}
        </div>
      </div>
    );
  }
}

export default User;
