import React, { Component } from 'react';
import LoginAndSignupModal from './Signup-Login-Modal';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

class App extends Component {

  render() {
    console.log(this.props.currentUser);
    return(
      <div>
        <AppHeader currentUser={this.props.currentUser} />
        { this.props.children }
        <AppFooter />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(App);
