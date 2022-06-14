import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Login from 'pages/Login';

jest.mock('react-redux', () => ({
  useSelector: () => jest.fn(),
  useDispatch: () => jest.fn()
}));

describe('Login Page', () => {
  it('should render page', async () => {
    render(<Login />);
    expect(screen.getByTestId('login-content')).toBeVisible();
    expect(screen.getByTestId('user-card-Moderator')).toBeVisible();
    fireEvent.click(screen.getByTestId('user-card-Moderator'));
  });
});
