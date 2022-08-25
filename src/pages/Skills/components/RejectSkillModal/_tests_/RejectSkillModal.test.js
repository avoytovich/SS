import React from 'react';

import {fireEvent, render, screen, act} from 'containers/TestProviderWrapper';

import RejectSkillModal from '../index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  }),
  useLocation: () => ({
    pathname: '/tags'
  })
}));

describe('RejectSkillModal test', () => {
  const mockOnClose = jest.fn();

  it('should open create modal', () => {
    act(() => {
      render(<RejectSkillModal isOpen onClose={mockOnClose} />);
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-modal-wrap')).toBeVisible();
    fireEvent.click(screen.getByTestId('dialog-actions-cancel-btn'));
  });
});
