import React from 'react';
import {fireEvent, render, screen} from 'utils/test-utils';
import TagModal from 'components/Tags/TagModal';

describe('TagModal', () => {
  const mockOnClose = jest.fn();

  it('should render create modal', () => {
    render(<TagModal open data-testid="test-model" onClose={mockOnClose} />);
    expect(screen.getByTestId('test-model')).toBeVisible();
    fireEvent.click(screen.getByTestId('tag-dialog-cancel-btn'));
  });

  it('should render edit modal and save', () => {
    render(
      <TagModal open id="test-id" name="test-name" data-testid="test-model" onClose={mockOnClose} />
    );
    expect(screen.getByTestId('test-model')).toBeVisible();
    expect(screen.getByTestId('tag-dialog-input')).toBeVisible();
    const Input = screen.getByTestId('tag-dialog-input').querySelector('input');
    expect(Input).toBeInTheDocument();
    fireEvent.change(Input, {target: {value: 'tag'}});
    fireEvent.click(screen.getByTestId('tag-dialog-save-btn'));
  });
});
