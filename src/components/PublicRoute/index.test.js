import React from 'react';
import { render } from 'utils/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import * as redux from 'react-redux';
import AppRouter from 'routers/AppRouter';
import { userRoles } from 'constants/user';

test('Redirect authenticated users to home', () => {
  const history = createMemoryHistory({ initialEntries: ['/login'] });
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({ auth: { token: userRoles.SUPER_ADMIN.id } });

  render(
    <Router history={history}>
      <AppRouter />
    </Router>
  );

  expect(history.location.pathname).toBe('/home');
});
