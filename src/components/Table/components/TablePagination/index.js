import React from 'react';
import PropTypes from 'prop-types';
import MuiTablePagination from '@mui/material/TablePagination';

const TablePagination = (
  count,
  page,
  rowsPerPageOptions,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  ...props
) => (
  <MuiTablePagination
    rowsPerPageOptions={rowsPerPageOptions}
    rowsPerPage={rowsPerPage}
    component="div"
    count={count}
    page={page}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    {...props}
  />
);

TablePagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func
};

TablePagination.defaultProps = {
  count: 0,
  page: 0,
  rowsPerPage: 20,
  rowsPerPageOptions: [],
  onPageChange: () => {},
  onRowsPerPageChange: () => {}
};

export default React.memo(TablePagination);
