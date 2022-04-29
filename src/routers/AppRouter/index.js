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

const AppRouter = () => (
  <Switch>
    <PublicRoute path={['/', '/login']} restricted exact={true}>
      <Login />
    </PublicRoute>
    <PrivateRoute path="/home" exact={true}>
      <Home />
    </PrivateRoute>
    <PrivateRoute path="/skills" exact={true}>
      <SkillsRegistry />
    </PrivateRoute>
    <PrivateRoute path="/skills/:name" exact={true}>
      <NeighborsList />
    </PrivateRoute>
    <PrivateRoute path="/employees" exact={true}>
      <EmployeeList />
    </PrivateRoute>
    <PrivateRoute path="/employees/:employeeId" exact={true}>
      <EmployeeDetails />
    </PrivateRoute>
    <Route component={NotFound} />
  </Switch>
);

export default AppRouter;
