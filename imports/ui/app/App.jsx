import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AppHeader from '../nav/AppHeader';
import AppFooter from './AppFooter';
import { Menus } from '../../api/menus';

class App extends Component {

  render() {
    console.log(this.props.currentUser);
    return(
      <div>
        <AppHeader currentUser={this.props.currentUser} menus={this.props.menus} />
        { this.props.children }
        <AppFooter />
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
    menus: Menus.find({}).fetch(),
  };
})(App);
