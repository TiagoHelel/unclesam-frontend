import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import CreateManagedUser from '../pages/CreateManagedUser';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />

    <Route path="/createuser" component={CreateManagedUser} isPrivate />
  </Switch>
);

export default Routes;
