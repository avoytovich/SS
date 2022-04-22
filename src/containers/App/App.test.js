import { render, screen } from '@testing-library/react';
import React from 'react';
import * as redux from 'react-redux';
import App from './App';
import { store } from '../../store';

test('renders learn react link', () => {
  const spy = jest.spyOn(redux, 'useSelector');
  spy.mockReturnValue({ auth: { token: 'Super Admin' } });

  render(
    <redux.Provider store={store}>
      <App />
    </redux.Provider>
  );

  const linkElement = screen.getByText(/Smart Skills/i);
  expect(linkElement).toBeInTheDocument();
});
