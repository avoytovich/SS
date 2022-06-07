import React from 'react';
import {Route, Switch} from 'react-router-dom';

import routes from 'constants/routes';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

import Login from 'pages/Login';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Skills from 'pages/Skills';
import NeighborsList from 'pages/NeighborsList';
import Employees from 'pages/Employees';
import EmployeeDetails from 'components/Employees/EmployeeDetails';
import Tags from 'pages/Tags';
import MyProfile from 'pages/Profile';
import {PermissionEnum} from 'constants/permissions';

const AppRouter = () => (
  <Switch>
    <PrivateRoute path={routes.home} exact>
      <Home />
    </PrivateRoute>
    <PublicRoute path={routes.login} restricted>
      <Login />
    </PublicRoute>
    <PrivateRoute path={routes.skills.list} permissions={[PermissionEnum.SKILLS_LIST]} exact>
      <Skills />
    </PrivateRoute>
    <PrivateRoute path={routes.skills.details.path} exact>
      <NeighborsList />
    </PrivateRoute>
    <PrivateRoute path={routes.employees.list} permissions={[PermissionEnum.USERS_LIST]} exact>
      <Employees />
    </PrivateRoute>
    <PrivateRoute
      path={routes.employees.details.path}
      permissions={[PermissionEnum.USERS_LIST]}
      exact
    >
      <EmployeeDetails />
    </PrivateRoute>
    <PrivateRoute path={routes.tags.list} permissions={[PermissionEnum.TAGS_LIST]} exact>
      <Tags />
    </PrivateRoute>
    <PrivateRoute path={routes.profile} permissions={[PermissionEnum.USERS_ME]} exact>
      <MyProfile />
    </PrivateRoute>
    <Route component={NotFound} path="*" />
  </Switch>
);

export default AppRouter;
