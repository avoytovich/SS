import React from 'react';
import {render, screen} from 'utils/test-utils';
import SkillsList from 'components/Skills/SkillsList';
import {SnackbarProvider} from 'notistack';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: '/skills'
  })
}));

describe('SkillsList', () => {
  it('renders without crashes', () => {
    render(
      <SnackbarProvider>
        <SkillsList />
      </SnackbarProvider>
    );
    expect(screen.getByTestId('skills-list-box')).toBeVisible();
    expect(screen.getByTestId('skills-list-filter')).toBeVisible();
    expect(screen.getByTestId('skill-name-search-input')).toBeVisible();
    expect(screen.getByTestId('tag-filter-input')).toBeVisible();
  });
});
