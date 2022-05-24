import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import {USER_ROLES_PERMISSIONS} from 'constants/permissions';

import ErrorFallback from '../../components/ErrorFallback';
import AppRouter from '../../routers/AppRouter';
import MainContainer from '../../components/Common/Layout/MainContainer';

import {setPermissions, clearPermissions} from '../../store/permissions/permissions';

import '../../assets/fonts/Ubuntu-Light.ttf';
import '../../assets/fonts/Ubuntu-Regular.ttf';
import '../../assets/fonts/Ubuntu-Medium.ttf';

import './App.css';

const App = () => {
  const {profile} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile && profile.role) {
      dispatch(setPermissions(USER_ROLES_PERMISSIONS[profile.role]));
    } else {
      dispatch(clearPermissions());
    }
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <MainContainer>
          <AppRouter />
        </MainContainer>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
