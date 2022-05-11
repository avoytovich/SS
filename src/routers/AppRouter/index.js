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
    <PrivateRoute path={routes.home} exact>
      <Home />
    </PrivateRoute>
    <PublicRoute path={routes.login} restricted>
      <Login />
    </PublicRoute>
    <PrivateRoute path={routes.skills.list} exact>
      <SkillsRegistry />
    </PrivateRoute>
    <PrivateRoute path={routes.skills.details.path} exact>
      <NeighborsList />
    </PrivateRoute>
    <PrivateRoute path={routes.employees.list} exact>
      <EmployeeList />
    </PrivateRoute>
    <PrivateRoute path={routes.employees.details.path} exact>
      <EmployeeDetails />
    </PrivateRoute>
    <Route component={NotFound} path="*" />
  </Switch>
);

export default AppRouter;
