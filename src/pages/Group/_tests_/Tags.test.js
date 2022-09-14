import React from 'react';

import {act, fireEvent, render, screen, store} from 'containers/TestProviderWrapper';
import {setPermissions} from 'store/permissions/permissions';
import routes from 'constants/routes';

import Groups from '../index';

const mockUseLocationPath = routes.groups.list;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: mockUseLocationPath
  })
}));

describe('Groups', () => {
  store.dispatch(setPermissions(['app.groups.create', 'app.groups.delete']));

  it('should render groups page', async () => {
    render(<Groups />);
    expect(screen.getByTestId('group-page-create-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('group-page-create-btn'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Create new group');
    expect(screen.getByTestId('group-modal-confirm-btn')).toBeDisabled();

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {target: {value: 'group'}});
    });

    expect(screen.getByRole('textbox')).toHaveValue('group');

    expect(screen.getByTestId('group-modal-confirm-btn')).not.toBeDisabled();
    await act(async () => {
      fireEvent.click(screen.getByTestId('group-modal-confirm-btn'));
    });
  });
  it('should render open create group modal', async () => {
    render(<Groups />);
    expect(screen.getByTestId('group-page-create-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('group-page-create-btn'));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Create new group');
    expect(screen.getByTestId('group-modal-confirm-btn')).toBeDisabled();
    fireEvent.click(screen.getByTestId('group-modal-cancel-btn'));
  });
});
