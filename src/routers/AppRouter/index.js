import React from 'react';
import {Route, Switch} from 'react-router-dom';

import routes from '../../constants/routes';

import PrivateRoute from '../../components/PrivateRoute';
import PublicRoute from '../../components/PublicRoute';

import Login from '../../pages/Login';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import SkillsRegistry from '../../pages/SkillsRegistry';
import NeighborsList from '../../pages/NeighborsList';
import EmployeeList from '../../pages/EmployeeList';
import EmployeeDetails from '../../pages/EmployeeDetails';

const AppRouter = () => (
  <Switch>
    <PublicRoute path={[routes.home, routes.login]} restricted exact={true}>
      <Login />
    </PublicRoute>
    <PrivateRoute path={routes.home} exact={true}>
      <Home />
    </PrivateRoute>
    <PrivateRoute path={routes.skills.list} exact={true}>
      <SkillsRegistry />
    </PrivateRoute>
    <PrivateRoute path={routes.skills.details.path} exact={true}>
      <NeighborsList />
    </PrivateRoute>
    <PrivateRoute path={routes.employees.list} exact={true}>
      <EmployeeList />
    </PrivateRoute>
    <PrivateRoute path={routes.employees.details.path} exact={true}>
      <EmployeeDetails />
    </PrivateRoute>
    <Route component={NotFound} />
  </Switch>
);

export default AppRouter;
