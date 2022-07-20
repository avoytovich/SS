import React from 'react';
import PropTypes from 'prop-types';
import {DataGrid} from '@mui/x-data-grid';

import {dataGridRootStyles, GridPagination, NoRows} from 'components/Common/DataGrid';
import {headerHeight, pageSize, rowHeight} from 'constants/dataGrid';

import useStyles from '../styles';

import columns from './constants';

const SkillTable = ({
  rows,
  page,
  total,
  isPagination,
  sortModel,
  loading,
  onSortChange,
  onPageChange
}) => {
  const classes = useStyles();

  return (
    <DataGrid
      components={{
        Pagination: isPagination && GridPagination,
        NoRowsOverlay: NoRows
      }}
      componentsProps={{
        noRowsOverlay: {
          className: classes.tableEmptyMessage,
          emptyMessage: 'No skills'
        }
      }}
      rows={rows}
      page={page}
      columns={columns}
      sortingMode="server"
      sortModel={sortModel}
      onSortModelChange={onSortChange}
      paginationMode="server"
      pagination
      rowsPerPageOptions={[pageSize]}
      pageSize={pageSize}
      onPageChange={onPageChange}
      rowCount={total}
      sx={dataGridRootStyles}
      loading={loading}
      rowHeight={rowHeight}
      headerHeight={headerHeight}
      disableColumnMenu
      disableSelectionOnClick
      autoHeight
    />
  );
};

SkillTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortModel: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isPagination: PropTypes.bool,
  loading: PropTypes.bool,
  onSortChange: PropTypes.func,
  onPageChange: PropTypes.func
};

SkillTable.defaultProps = {
  isOpen: false,
  page: 0,
  total: 0,
  isPagination: false,
  loading: false,
  onSortChange: () => {},
  onPageChange: () => {}
};

export default SkillTable;
