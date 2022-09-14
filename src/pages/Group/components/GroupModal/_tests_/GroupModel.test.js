import React from 'react';

import {fireEvent, render, screen, act, waitFor} from 'containers/TestProviderWrapper';

import GroupModal from '../index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: '/groups'
  })
}));

describe('GroupModal', () => {
  const mockOnClose = jest.fn();

  it('should open create modal', () => {
    act(() => {
      render(<GroupModal isOpen onClose={mockOnClose} />);
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Create new group');
    fireEvent.click(screen.getByTestId('group-modal-cancel-btn'));
  });

  it('should create new group', async () => {
    render(<GroupModal isOpen onClose={mockOnClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {target: {value: 'new group'}});
    });

    await waitFor(() => {
      expect(screen.getByRole('textbox')).not.toBe(null);
    });
  });

  it('should edit group', async () => {
    render(<GroupModal isOpen id="test-id" groupName="test-name" onClose={mockOnClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Edit "test-name" group');

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {target: {value: 'group'}});
    });

    await waitFor(() => {
      expect(screen.getByRole('textbox')).not.toBe(null);
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('group-modal-confirm-btn'));
    });
  });
});
