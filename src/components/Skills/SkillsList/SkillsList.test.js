import React from 'react';
import {render, screen} from 'containers/TestProviderWrapper';
import SkillsList from 'components/Skills/SkillsList';

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
    render(<SkillsList />);
    expect(screen.getByTestId('skills-list-box')).toBeVisible();
    expect(screen.getByTestId('skills-list-filter')).toBeVisible();
    expect(screen.getByTestId('skill-name-search-input')).toBeVisible();
    expect(screen.getByTestId('multiple-autocomplete-input')).toBeVisible();
  });
});
