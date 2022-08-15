import React from 'react';
import PropTypes from 'prop-types';
import MuiTableHead from '@mui/material/TableHead';

import useTable from 'hooks/useTable';

import TableRow from '../TableRow';
import {TableCell} from '../TableCells';

import TableSortLabel from './TableSortLabel';

const TableHead = ({id, headCells, sortBy, onSort}) => {
  const {sort, sortDirection, onSortChange: onChange} = useTable();

  const isActive = cellId => (sort.replace('-', '') || sortBy) === cellId;

  const handleSort = value => {
    onChange(value);
    onSort(value);
  };

  return (
    <MuiTableHead id={id} data-testid={id}>
      <TableRow id={`${id}-row`} data-testid={`${id}-row`}>
        {headCells.map(cell => (
          <TableCell
            id={`${id}-${cell.key}`}
            key={cell.key}
            align={cell.align ?? 'left'}
            sortDirection={isActive(cell.key) ? sortDirection : false}
          >
            <TableSortLabel
              cell={cell}
              isActive={isActive(cell.key)}
              onSort={handleSort}
              sortDirection={sortDirection}
            />
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

TableHead.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sortBy: PropTypes.string,
  headCells: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      align: PropTypes.string,
      sortable: PropTypes.bool
    })
  ),
  onSort: PropTypes.func
};

TableHead.defaultProps = {
  id: 'table-head',
  headCells: [],
  sortBy: '',
  onSort: () => {}
};

export default React.memo(TableHead);
