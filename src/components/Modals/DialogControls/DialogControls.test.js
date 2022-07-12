import React from 'react';

import {render, screen, fireEvent} from 'containers/TestProviderWrapper';

import DialogControls from './index';

const onSubmit = jest.fn();
const onClose = jest.fn();

describe('DialogControls', () => {
  it('renders  without crashes', () => {
    render(<DialogControls />);

    expect(screen.getByTestId('dialog-actions-btn')).toBeVisible();
    expect(screen.getByTestId('dialog-actions-cancel-btn')).toBeVisible();
    expect(screen.getByTestId('dialog-actions-confirm-btn')).toBeVisible();
  });

  it('should render with disabled confirm button', () => {
    render(<DialogControls disabledConfirm onSubmit={onSubmit} />);

    expect(screen.getByTestId('dialog-actions-confirm-btn')).toBeDisabled();

    fireEvent.click(screen.getByTestId('dialog-actions-confirm-btn'));
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should call onSubmit after click on confirm button', () => {
    render(<DialogControls onSubmit={onSubmit} onClose={onClose} />);

    expect(screen.getByTestId('dialog-actions-confirm-btn')).not.toBeDisabled();
    fireEvent.click(screen.getByTestId('dialog-actions-confirm-btn'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should call onClose after click on cancel button', () => {
    render(<DialogControls onClose={onClose} />);

    fireEvent.click(screen.getByTestId('dialog-actions-cancel-btn'));
    expect(onClose).toHaveBeenCalled();
  });
});
