import React from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import routes from '../../../constants/routes';

function PublicRoute({children, restricted, ...rest}) {
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={({location}) =>
        isAuthenticated && restricted ? (
          <Redirect
            to={{
              pathname: routes.home,
              state: {from: location}
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

export default PublicRoute;
