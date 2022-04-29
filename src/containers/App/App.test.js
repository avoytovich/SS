import { render, screen } from '@testing-library/react';
import React from 'react';
import * as redux from 'react-redux';
import { userRoles } from 'constants/user';
import { HelmetProvider } from 'react-helmet-async';
import { store } from '../../store/store';
import App from './App';

test('render app', () => {
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({ auth: { token: userRoles.SUPER_ADMIN.id } });

  render(
    <redux.Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </redux.Provider>
  );

  const linkElement = screen.getByText(/Smart Skills/i);
  expect(linkElement).toBeInTheDocument();
});
