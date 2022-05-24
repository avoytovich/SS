import React from 'react';
import {render, screen, fireEvent, waitFor} from 'utils/test-utils';
import {SearchField} from 'components/Common/DataGrid/Filters/SearchField';

describe('SearchField', () => {
  const mockOnChange = jest.fn();
  const mockOnClear = jest.fn();
  it('renders without crashes', () => {
    render(<SearchField onChange={mockOnChange} />);
    expect(screen.getByTestId('search-field-input')).toBeVisible();
  });
  it('should fill input', async () => {
    render(<SearchField onClear={mockOnClear} onChange={mockOnChange} />);
    expect(screen.getByTestId('search-field-input')).toBeVisible();
    const Input = screen.getByTestId('search-field-input').querySelector('input');
    expect(Input).toBeInTheDocument();
    fireEvent.change(Input, {target: {value: 'test search'}});
    await waitFor(() => expect(mockOnChange).toHaveBeenCalledTimes(1));
  });
  it('should clear input', async () => {
    render(<SearchField value="Test Value" onClear={mockOnClear} onChange={mockOnChange} />);
    expect(screen.getByTestId('search-field-input')).toBeVisible();
    expect(screen.getByTestId('search-field-remove-btn')).toBeVisible();
    fireEvent.click(screen.getByTestId('search-field-remove-btn'));
    await waitFor(() => expect(mockOnClear).toHaveBeenCalledTimes(1));
  });
});
