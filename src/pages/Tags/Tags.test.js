import React from 'react';
import {fireEvent, render, screen} from 'utils/test-utils';
import Tags from 'pages/Tags';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: '/tags'
  })
}));

describe('Tags', () => {
  it('should render tags page', () => {
    render(<Tags />);
    expect(screen.getByTestId('tag-page-create-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('tag-page-create-btn'));
  });
});
