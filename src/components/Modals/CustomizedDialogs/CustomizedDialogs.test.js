import React from 'react';
import {render, screen} from '../../../utils/test-utils';
import CustomizedDialogs from './index';

describe('CustomizedDialogs', () => {
  it('CustomizedDialogs renders without crashes', () => {
    render(<CustomizedDialogs isOpen />);
    expect(screen.getByTestId('dialog-modal-wrap')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-cancel-btn')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-confirm-btn')).toBeVisible();
  });

  it('CustomizedDialogs renders with remove modal styles', () => {
    render(<CustomizedDialogs isOpen isRemove confirmText="title" removeText="Remove_title" />);
    expect(screen.getByTestId('dialog-modal-wrap')).toHaveTextContent('Remove_title');
  });

  it('CustomizedDialogs renders without default controls', () => {
    render(<CustomizedDialogs isOpen withCustomBtns />);
    expect(screen.queryByTestId('confirm-modal-cancel-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('confirm-modal-confirm-btn')).not.toBeInTheDocument();
  });
});
