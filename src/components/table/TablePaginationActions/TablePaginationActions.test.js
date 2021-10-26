import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TablePaginationActions from '.';

afterEach(cleanup);

test('should render component', () => {
  const { getByTestId } = render(<TablePaginationActions page={1} count={1} onPageChange={() => {}}
  rowsPerPage={10}/>);
  const paginationElement = getByTestId('table-pagination');
  expect(paginationElement).toBeInTheDocument();
});

test('no data check', () => {
  const { getAllByRole } = render(<TablePaginationActions page={0} count={0} onPageChange={() => {}}
  rowsPerPage={10}/>);
  const buttons = getAllByRole('button', { hidden: true });
  buttons.forEach(btn => expect(btn).toBeDisabled());
});
