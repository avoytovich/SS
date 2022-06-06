import React from 'react';
import {render, screen} from 'utils/test-utils';
import Employees from 'pages/Employees';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: '/employees'
  })
}));

describe('Employees', () => {
  it('should render profile page', async () => {
    render(<Employees />);
    expect(screen.getByTestId('page-header-title-text')).toBeVisible();
    expect(screen.getByTestId('page-header-title-text')).toHaveTextContent('Employees');
  });
});
