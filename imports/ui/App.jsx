import React, { Component } from 'react';
import LoginAndSignupModal from './Signup-Login-Modal';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      kindModal: '',
    };
  }

  openRegisterModal = () => {
    this.setState({
      showModal: true,
      kindModal: 'register',
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      kindModal: '',
    });
  }

  openLoginModal = () => {
    this.setState({
      showModal: true,
      kindModal: 'login',
    })
  }

  changeModal = () => {
    console.log('change modal');
    if (this.state.kindModal == 'login') {
      this.setState({
        kindModal: 'register',
      })
    } else {
      this.setState({
        kindModal: 'login',
      })
    }
  }

  logout = () => {
    Meteor.logout((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('logged out');
      }
    })
  }

  render() {
    console.log(this.props.currentUser);
    return(
      <div>
        <div className="Navbar inline">
          <input type="text" className="search-wrapper" placeholder="Search"/>
          <div className="nav-group">
            { !this.props.currentUser && 
              <button className="signup-btn" onClick={this.openRegisterModal}>Register</button>
            }
            { !this.props.currentUser && 
              <button className="login-btn" onClick={this.openLoginModal}>Login</button>
            }
            {  this.props.currentUser && 
              <button onClick={this.logout}>Logout</button>
            }
          </div>
        </div>

        <LoginAndSignupModal show={this.state.showModal} kind={this.state.kindModal} close={this.closeModal} 
          change={this.changeModal} />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);
