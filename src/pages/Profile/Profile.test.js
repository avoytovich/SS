import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import {fireEvent, render, screen} from 'containers/TestProviderWrapper';
import MyProfile from 'pages/Profile';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: '/profile'
  })
}));

describe('Profile', () => {
  it('should render profile page', async () => {
    render(
      <Router>
        <MyProfile />
      </Router>
    );
    expect(screen.getByTestId('profile-page-skillset-btn')).toBeVisible();
    expect(screen.getByTestId('page-header-title-text')).toBeVisible();
    expect(screen.getByTestId('page-header-title-text')).toHaveTextContent('My profile');
    fireEvent.click(screen.getByTestId('profile-page-skillset-btn'));
  });
});
