import React from 'react';
import { render } from 'utils/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import AppRouter from 'routers/AppRouter';

test('Redirect unauthenticated users to login page', () => {
  const history = createMemoryHistory({ initialEntries: ['/home'] });

  render(
    <Router history={history}>
      <AppRouter />
    </Router>
  );

  expect(history.location.pathname).toBe('/login');
});
