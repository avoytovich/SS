import {render, screen} from 'utils/test-utils';
import React from 'react';
import * as redux from 'react-redux';
import {userRoles} from 'constants/user';
import App from './App';

test('render app', () => {
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({auth: {token: userRoles.SUPER_ADMIN.id}});

  render(<App />);

  const linkElement = screen.getByText(/Smart Skills/i);
  expect(linkElement).toBeInTheDocument();
});
