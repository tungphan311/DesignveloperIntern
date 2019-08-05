import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AppHeader from '../nav/AppHeader';
import AppFooter from './AppFooter';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import { Subjects } from '../../api/subjects';
import { KindOfClothes } from '../../api/kind-of-clothes';
import ProductList from '../products/ProductList';

class App extends Component {

  render() {
    return(
      <div className="app">
        <AppHeader currentUser={this.props.currentUser} subjects={this.props.subjects} kinds={this.props.kindOfClothes} history={this.props.history} />
        <div className="content">
          <Switch>
            <Route exact path="/" component={() => <Home subjects={this.props.subjects} history={this.props.history} />} />
            <Route path={["/men", "/ladies", "/boys", "/girls"]} component={() => 
              <ProductList subjects={this.props.subjects} kindOfClothes={this.props.kindOfClothes} />} />
          </Switch> 
        </div>
        <AppFooter history={this.props.history} />
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('subjects');
  Meteor.subscribe('kindOfClothes');

  return {
    currentUser: Meteor.user(),
    subjects: Subjects.find({}).fetch(),
    kindOfClothes: KindOfClothes.find({}).fetch()
  };
})(App);
