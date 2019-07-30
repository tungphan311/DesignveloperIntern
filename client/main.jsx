import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/app/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// const routes = (
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//     </Route>
//   </Router>
// );

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
