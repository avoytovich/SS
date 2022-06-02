import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import routes from 'constants/routes';

function PrivateRoute({children, hasPermissions = true, ...rest}) {
  const isAuthenticated = useSelector(state => state.auth.token);
  const redirectPathName = !isAuthenticated ? routes.login : routes.home;

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
        isAuthenticated && hasPermissions ? children : redirectTo(redirectPathName, location)
      }
    />
  );
}

export default PrivateRoute;
