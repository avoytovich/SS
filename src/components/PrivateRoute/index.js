import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import routes from 'constants/routes';
import usePermissions from '../../hooks/permissions';

function PrivateRoute({children, permissions = [], ...rest}) {
  const {hasPermissions} = usePermissions();
  const isAuthenticated = useSelector(state => state.auth.token);
  const redirectPathName = !isAuthenticated ? routes.login : routes.home;
  const isAuthorized = !permissions.length || hasPermissions(permissions);

  const redirectTo = (pathname, location) => (
    <Redirect
      to={{
        pathname,
        state: {from: location}
      }}
    />
  );

  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated && isAuthorized ? children : redirectTo(redirectPathName, location)
      }
    />
  );
}

export default PrivateRoute;
