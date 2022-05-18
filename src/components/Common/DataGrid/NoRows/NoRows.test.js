import React from 'react';
import {render, screen} from 'utils/test-utils';
import {NoRows} from 'components/Common/DataGrid/NoRows';

describe('NoRows', () => {
  it('renders without crashes', () => {
    render(<NoRows />);
    expect(screen.getByTestId('no-rows-title')).toBeVisible();
  });

  it('should render with parameters', () => {
    const emptyMessage = 'No Row Test Message';
    const actionTitle = 'Action No Row Test Message';
    const mockAddNewRow = jest.fn();

    render(
      <NoRows
        emptyMessage={emptyMessage}
        isAction
        actionTitle={actionTitle}
        onAddNewRow={mockAddNewRow}
        data-testid="no-rows-test-container"
      />
    );
    expect(screen.getByTestId('no-rows-test-container')).toBeVisible();
    expect(screen.getByTestId('no-rows-btn')).toBeVisible();
    expect(screen.getByTestId('no-rows-title')).toHaveTextContent(emptyMessage);
  });
});
