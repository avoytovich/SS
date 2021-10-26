import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SortedTableHead from '.';

afterEach(cleanup);

const table = document.createElement('table');

test('should render component', () => {
  const { getByTestId } = render(<SortedTableHead
      headCells={[]}
      order={'asc'}
      orderBy={'id'}
      onRequestSort={() => {}} />,
  { container: document.body.appendChild(table) });

  const tableElement = getByTestId('sorted-table-head');
  expect(tableElement).toBeInTheDocument();
});

test('columns click test', () => {
  const headCells = [{
    id: 'ID', numeric: true, label: 'ID', width: '10%',
  }, {
    id: 'Group', numeric: false, label: 'Skills Group', width: '35%',
  }, {
    id: 'Name', numeric: false, label: 'Skill Name', width: '43%',
  }, {
    id: 'EngineersCount', numeric: true, label: '# Engineers', width: '12%',
  }];

  const { getAllByRole } = render(<SortedTableHead
      headCells={headCells}
      order={'asc'}
      orderBy={'id'}
      onRequestSort={() => {}} />,
  { container: document.body.appendChild(table) });

  const cellLabels = getAllByRole('cell-label');
  cellLabels.forEach(col => {
    fireEvent.click(col);
  });
});
