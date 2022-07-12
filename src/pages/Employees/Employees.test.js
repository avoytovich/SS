import React from 'react';

import {render, screen} from 'containers/TestProviderWrapper';
import Employees from 'pages/Employees';
import routes from 'constants/routes';

const mockUseLocationPath = routes.employees.list;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: mockUseLocationPath
  })
}));

describe('Employees', () => {
  it('should render profile page', async () => {
    render(<Employees />);
    expect(screen.getByTestId('page-header-title-text')).toBeVisible();
    expect(screen.getByTestId('page-header-title-text')).toHaveTextContent('Employees');
  });
});
