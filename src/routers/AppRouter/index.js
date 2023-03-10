import React from 'react';
import {Route, Switch} from 'react-router-dom';

import routes from 'constants/routes';
import PrivateRoute from 'components/Routes/PrivateRoute';
import AccessDenied from 'pages/AccessDenied';
import NotFound from 'pages/NotFound';
import Skills from 'pages/Skills';
import SkillDetails from 'pages/Skills/SkillDetails';
import Employees from 'pages/Employees';
import Group from 'pages/Group';
import MyProfile from 'pages/Profile';
import Home from 'pages/Home';
import SkillSet from 'pages/SkillSet';
import Users from 'pages/Users';
import {PermissionEnum} from 'constants/permissions';

const AppRouter = () => (
  <Switch>
    <PrivateRoute path={routes.skills.list} permissions={[PermissionEnum.SKILLS_LIST]} exact>
      <Skills />
    </PrivateRoute>
    <PrivateRoute
      path={routes.skills.details.path}
      permissions={[PermissionEnum.SKILLS_DETAILS]}
      exact
    >
      <SkillDetails />
    </PrivateRoute>
    <PrivateRoute path={routes.employees.list} permissions={[PermissionEnum.USERS_LIST]} exact>
      <Employees />
    </PrivateRoute>
    <PrivateRoute path={routes.groups.list} permissions={[PermissionEnum.GROUPS_LIST]} exact>
      <Group />
    </PrivateRoute>
    <PrivateRoute path={routes.profile} permissions={[PermissionEnum.USERS_ME]} exact>
      <MyProfile />
    </PrivateRoute>
    <PrivateRoute
      path={routes.users.list}
      permissions={[PermissionEnum.USERS_MANAGMENT_LIST]}
      exact
    >
      <Users />
    </PrivateRoute>
    <PrivateRoute path={routes.home} exact>
      <Home />
    </PrivateRoute>
    <PrivateRoute path={routes.skillSet} permissions={[PermissionEnum.USERS_ME]} exact>
      <SkillSet />
    </PrivateRoute>
    <Route component={AccessDenied} path={routes.errors.accessDenied} exact />
    <Route component={NotFound} path="*" />
  </Switch>
);

export default AppRouter;
