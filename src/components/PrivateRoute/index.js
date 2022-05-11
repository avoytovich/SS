import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import routes from '../../constants/routes';

function PrivateRoute({children, ...rest}) {
  const isAuthenticated = useSelector(state => state.auth.token);
  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: routes.login,
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
