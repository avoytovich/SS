import React from 'react';
import {render} from 'utils/test-utils';

import PrivateRoute from 'components/PrivateRoute';
import userRoles from 'constants/userRoles';

describe('PrivateRoute', () => {
  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
  });

  it('Redirect authenticated request', () => {
    const spy = jest.spyOn(redux, 'useSelector');
    spy.mockReturnValue({auth: {token: userRoles.SUPER_ADMIN.id}});

    render(
      <PrivateRoute>
        <div data-testid="test-children" />
      </PrivateRoute>
    );

    expect(screen.getByTestId('test-children')).not.toBeVisible();
  });

  it('Redirect unauthenticated request', () => {
    render(<PrivateRoute />);

    expect(screen.getByTestId('test-children')).toBeVisible();
  });
});
