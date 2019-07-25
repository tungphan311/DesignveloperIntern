import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SignUpModal from './SignUp';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  open = () => {
    this.setState({
      showModal: true,
    });
  }

  close = () => {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return(
      <div>
        <div className="Navbar inline">
          <input type="text" className="search-wrapper" placeholder="Search"/>
          <div className="nav-group">
            <button className="signup-btn" onClick={this.open}>Register</button>
            <button className="login-btn">
              Login
            </button>
          </div>
        </div>
        <SignUpModal close={this.close} show={this.state.showModal} />
      </div>
    );
  }
}
