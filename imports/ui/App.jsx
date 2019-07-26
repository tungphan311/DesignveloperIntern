import React, { Component, useState } from 'react';
import SignUpModal from './SignUp';
import LoginModal from './Login';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegisterModal: false,
      showLoginModal: false,
    };
  }

  openRegisterModal = () => {
    this.setState({
      showRegisterModal: true,
    });
  }

  closeRegisterModal = () => {
    this.setState({
      showRegisterModal: false,
    });
  }

  openLoginModal = () => {
    this.setState({
      showLoginModal: true,
    })
  }

  closeLoginModal = () => {
    this.setState({
      showLoginModal: false,
    })
  }

  render() {
    return(
      <div>
        <div className="Navbar inline">
          <input type="text" className="search-wrapper" placeholder="Search"/>
          <div className="nav-group">
            <button className="signup-btn" onClick={this.openRegisterModal}>Register</button>
            <button className="login-btn" onClick={this.openLoginModal}>Login</button>
          </div>
        </div>
        <SignUpModal close={this.closeRegisterModal} show={this.state.showRegisterModal} clear={this.state.clearForm}/>
        <LoginModal show={this.state.showLoginModal} close={this.closeLoginModal} />
      </div>
    );
  }
}
