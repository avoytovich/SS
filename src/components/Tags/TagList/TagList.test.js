import React from 'react';
import {render, screen} from 'utils/test-utils';
import TagList from './index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: '/tags'
  })
}));

describe('TagList', () => {
  it('renders without crashes', () => {
    render(<TagList />);
    expect(screen.getByTestId('tag-list-box')).toBeVisible();
    expect(screen.getByTestId('tag-list-filter')).toBeVisible();
    expect(screen.getByTestId('tag-list-filter-search')).toBeVisible();
    expect(screen.getByTestId('tag-list-filter-cleanup-btn')).toBeVisible();
  });
});
