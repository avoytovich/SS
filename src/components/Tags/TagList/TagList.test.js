import React from 'react';
import {fireEvent, render, screen} from 'containers/TestProviderWrapper';
import TagList from 'components/Tags/TagList';

const onSaveOrUpdateMock = jest.fn();
const hasPermissionsMock = jest.fn();

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
  it('should search tag name', () => {
    render(<TagList onSaveOrUpdate={onSaveOrUpdateMock} hasPermissions={hasPermissionsMock} />);
    expect(screen.getByTestId('tag-list-box')).toBeVisible();
    expect(screen.getByTestId('tag-list-filter')).toBeVisible();
    expect(screen.getByTestId('tag-name-search-input')).toBeVisible();
    const Input = screen.getByTestId('tag-name-search-input').querySelector('input');
    expect(Input).toBeInTheDocument();
    fireEvent.change(Input, {target: {value: 'test search'}});
  });
});
