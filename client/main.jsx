import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/app/App';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory()

const routes = (
  <Router history={history}>
    <Route path="/" component={App} />
  </Router>
);

Meteor.startup(() => {
  render(routes, document.getElementById('react-target'));
});
