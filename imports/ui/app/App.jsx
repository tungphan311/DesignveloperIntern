import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AppHeader from '../nav/AppHeader';
import AppFooter from './AppFooter';
import { Menus } from '../../api/menus';
import { Router, Route, Switch } from 'react-router-dom';
import MenProductList from '../men/MenProductList';
import LadiesProductList from '../ladies/LadiesProductList';
import Home from '../home/Home';

class App extends Component {

  render() {
    console.log(this.props.menus);
    return(
      <div className="app">
        <AppHeader currentUser={this.props.currentUser} menus={this.props.menus} history={this.props.history} />
        <div className="content">
          <Switch>
            <Route exact path="/" component={() => <Home menus={this.props.menus} history={this.props.history} />} />
            <Route exact path="/men" component={MenProductList} />
            <Route exact path="/ladies" component={LadiesProductList} />
          </Switch> 
        </div>
        <AppFooter history={this.props.history} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('menus');
  return {
    currentUser: Meteor.user(),
    menus: Menus.find({}).fetch(),
  };
})(App);
