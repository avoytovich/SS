import React from 'react';
import {fireEvent, render, screen, act, waitFor} from 'utils/test-utils';
import TagModal from 'components/Tags/TagModal';

describe('TagModal', () => {
  const mockOnClose = jest.fn();

  it('should open create modal', () => {
    act(() => {
      render(<TagModal isOpen onClose={mockOnClose} />);
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeVisible();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Create new tag');
    fireEvent.click(screen.getByTestId('tag-modal-cancel-btn'));
  });

  it('should create new tag', async () => {
    render(<TagModal isOpen onClose={mockOnClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {target: {value: 'new tag'}});
    });

    await waitFor(() => {
      expect(screen.getByRole('textbox')).not.toBe(null);
    });
  });

  it('should edit tag', async () => {
    render(<TagModal isOpen id="test-id" tagName="test-name" onClose={mockOnClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-modal-title')).toHaveTextContent('Edit "test-name" tag');

    expect(screen.getByRole('textbox')).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByRole('textbox'), {target: {value: 'tag'}});
    });

    await waitFor(() => {
      expect(screen.getByRole('textbox')).not.toBe(null);
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('tag-modal-confirm-btn'));
    });
  });
});
