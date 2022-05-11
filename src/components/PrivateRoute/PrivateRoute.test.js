import React from 'react';
import {render} from 'utils/test-utils';

import PrivateRoute from './PrivateRoute';

describe('PrivateRoute', () => {
  it('Redirect unauthenticated request', () => {
    jest.mock('react-redux', () => ({
      useSelector: () => ({auth: {token: 'token'}})
    }));

    render(
      <PrivateRoute>
        <div data-testid="test-children" />
      </PrivateRoute>
    );

    expect(screen.getByTestId('test-children')).not.toBeVisible();
  });

  it('Redirect authenticated request', () => {
    render(<PrivateRoute />);

    expect(screen.getByTestId('test-children')).toBeVisible();
  });
});
