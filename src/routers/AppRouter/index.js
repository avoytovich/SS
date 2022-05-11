import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import Login from 'pages/Login';
import Home from 'pages/Home';
import SkillsRegistry from 'pages/SkillsRegistry';
import NeighborsList from 'pages/NeighborsList';
import EmployeeList from 'pages/EmployeeList';
import EmployeeDetails from 'pages/EmployeeDetails';
import NotFound from 'pages/NotFound';
import { appRoutes } from 'constants/appRoutes';

const AppRouter = () => (
  <Switch>
    <PublicRoute path={['/', appRoutes.login]} restricted exact={true}>
      <Login />
    </PublicRoute>
    <PrivateRoute path={appRoutes.home} exact={true}>
      <Home />
    </PrivateRoute>
    <PrivateRoute path={appRoutes.skills} exact={true}>
      <SkillsRegistry />
    </PrivateRoute>
    <PrivateRoute path={appRoutes.neighbors} exact={true}>
      <NeighborsList />
    </PrivateRoute>
    <PrivateRoute path={appRoutes.employees} exact={true}>
      <EmployeeList />
    </PrivateRoute>
    <PrivateRoute path={appRoutes.employeeDetails} exact={true}>
      <EmployeeDetails />
    </PrivateRoute>
    <Route component={NotFound} />
  </Switch>
);

export default AppRouter;
