import React from 'react';
import PropTypes from 'prop-types';
import MuiTableSortLabel from '@mui/material/TableSortLabel';

const TableSortLabel = ({cell, onSort, isActive, sortDirection}) => {
  const onSortCell = () => onSort(cell.id);
  return (
    <MuiTableSortLabel
      id={`${cell.key}-sort-label`}
      data-testid={`${cell.key}-sort-label`}
      active={isActive}
      direction={sortDirection}
      hideSortIcon={!cell.sortable}
      onClick={onSortCell}
    >
      {cell.label}
    </MuiTableSortLabel>
  );
};

TableSortLabel.propTypes = {
  cell: PropTypes.shape({
    key: PropTypes.number,
    label: PropTypes.string,
    align: PropTypes.string,
    sortable: PropTypes.bool
  }),
  isActive: PropTypes.bool,
  sortDirection: PropTypes.oneOf(['asc', 'desc']),
  onSort: PropTypes.func
};

TableSortLabel.defaultProps = {
  cell: {},
  isActive: false,
  sortDirection: 'asc',
  onSort: () => {}
};

export default React.memo(TableSortLabel);
