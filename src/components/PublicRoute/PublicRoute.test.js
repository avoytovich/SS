import React from 'react';
import {render} from 'utils/test-utils';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import * as redux from 'react-redux';
import AppRouter from 'routers/AppRouter';
import userRoles, {UserRoleEnum} from 'constants/userRoles';
import routes from '../../constants/routes';

test('Redirect authenticated users to home', () => {
  const history = createMemoryHistory({initialEntries: [routes.login]});
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({auth: {token: userRoles[UserRoleEnum.SUPER_ADMIN].id}});

  render(
    <Router history={history}>
      <AppRouter />
    </Router>
  );

  expect(history.location.pathname).toBe(routes.home);
});
