import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FilterTableHead from '.';

afterEach(cleanup);

const table = document.createElement('table');

test('should render component', () => {
  const { getByTestId } = render(
    <FilterTableHead headCells={[]} primaryData={[]} onFiltersChange={() => {}} />,
    { container: document.body.appendChild(table) }
  );

  const tableElement = getByTestId('filter-table-head');
  expect(tableElement).toBeInTheDocument();
});
