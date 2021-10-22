import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CustomPaginationActionsTable from '.';

afterEach(cleanup);

test('should render component', () => {
  const { getByTestId } = render(<CustomPaginationActionsTable
    rows={[{
      ID: 0, Name: '.NET/Common Packages', Group: '.NET', EngineersCount: 345,
    }]}
    headCells={[]}
    rowsPerPage={25}
    order={'asc'}
    orderBy={'id'}
    onSortHandler={() => {}}
    isLoading={false}
    showFilteredColumn={false} />);
  const tableElement = getByTestId('custom-table');
  expect(tableElement).toBeInTheDocument();
});

test('no data check', () => {
  const { getByText } = render(<CustomPaginationActionsTable
        rows={[]}
        headCells={[]}
        rowsPerPage={25}
        order={'asc'}
        orderBy={'id'}
        onSortHandler={() => {}}
        isLoading={false}
        showFilteredColumn={false} />);
  const noDataElement = getByText('No data received.');
  expect(noDataElement).toBeInTheDocument();
});
