import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './App';
import FriendsView from 'features/friends/components/FriendsView';
import LoginView from 'features/auth/components/LoginView';
import NotFoundView from 'components/NotFound';
import { requireAuthentication } from '../utils/auth/AuthenticatedComponent';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuthentication(FriendsView)} />
    <Route path="login" component={LoginView}/>
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
);
