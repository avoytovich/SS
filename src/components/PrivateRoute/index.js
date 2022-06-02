import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import routes from 'constants/routes';

function PrivateRoute({children, roles = [], ...rest}) {
  const isAuthenticated = useSelector(state => state.auth.token);
  const {role} = useSelector(state => state.auth.profile);
  const redirectPathName = !isAuthenticated ? routes.login : routes.home;

  const isAuthorized =
    !roles.length || roles.some(currentRole => currentRole.toLowerCase() === role.toLowerCase());

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
