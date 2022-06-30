import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

// import {USER_ROLES_PERMISSIONS} from 'constants/permissions';

import ErrorFallback from 'components/ErrorFallback';
import AppRouter from 'routers/AppRouter';
import MainContainer from 'components/Common/Layout/MainContainer';

import {useIsAuthenticated} from '@azure/msal-react';
// import {setPermissions, clearPermissions} from 'store/permissions/permissions';

import 'assets/fonts/Ubuntu-Light.ttf';
import 'assets/fonts/Ubuntu-Regular.ttf';
import 'assets/fonts/Ubuntu-Medium.ttf';

import './App.css';
// import {setAuthUser} from 'store/auth';
import PublicRoute from '../../components/PublicRoute';
import routes from '../../constants/routes';
import Login from '../../pages/Login';
import PrivateRoute from '../../components/PrivateRoute';
import Home from '../../pages/Home';
import {useGetUserProfileMutation} from '../../api/profile';

const App = () => {
  const {profile} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();

  const [getUserProfile, {data, isSuccess}] = useGetUserProfileMutation();

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  console.log(isSuccess);
  console.log(data);
  console.log(profile);
  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(setAuthUser(data));
  //   }
  // }, [isSuccess]);

  // useEffect(() => {
  //   if (profile && profile.role) {
  //     dispatch(setPermissions(USER_ROLES_PERMISSIONS[profile.role]));
  //   } else {
  //     dispatch(clearPermissions());
  //   }
  // }, [profile]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <MainContainer>
          {isAuthenticated && <AppRouter />}
          <PrivateRoute path={routes.home} exact>
            <Home />
          </PrivateRoute>
          <PublicRoute path={routes.login} restricted>
            <Login />
          </PublicRoute>
        </MainContainer>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
