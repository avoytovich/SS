import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import routes from 'constants/routes';
import usePermissions from 'hooks/permissions';
import AccessDenied from 'pages/AccessDenied';

function PrivateRoute({children, permissions = [], ...rest}) {
  const {hasPermissions} = usePermissions();
  const {isAuthenticated} = useSelector(state => state.auth);
  const isAuthorized = !permissions.length || hasPermissions(permissions);

  const redirectTo = location => (
    <Redirect
      to={{
        pathname: routes.errors.pageNotFound,
        state: {from: location}
      }}
    />
  );

  return (
    <Route
      {...rest}
      render={({location}) => {
        if (!isAuthenticated) {
          return redirectTo(location);
        }
        return isAuthorized ? children : <AccessDenied />;
      }}
    />
  );
}

export default PrivateRoute;
