import React from 'react';
import PropTypes from 'prop-types';
import MuiTableHead from '@mui/material/TableHead';

import TableRow from '../TableRow';
import {TableCell} from '../TableCell';

import TableSortLabel from './TableSortLabel';

const TableHead = ({id, headCells, sortDirection, sortBy, onSort}) => (
  <MuiTableHead id={id} data-testid={id}>
    <TableRow id={`${id}-row`} data-testid={`${id}-row`}>
      {headCells.map(cell => (
        <TableCell
          id={`${id}-${cell.key}`}
          key={cell.key}
          align={cell.align ?? 'left'}
          sortDirection={sortBy === cell.id ? sortDirection : false}
        >
          <TableSortLabel
            cell={cell}
            isActive={sortBy === cell.key}
            onSort={onSort}
            sortDirection={sortDirection}
          />
        </TableCell>
      ))}
    </TableRow>
  </MuiTableHead>
);

TableHead.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
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
  sortDirection: 'asc',
  sortBy: '',
  onSort: () => {}
};

export default React.memo(TableHead);
