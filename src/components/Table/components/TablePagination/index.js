import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import MuiPagination from '@mui/material/Pagination';

import {defaultPage} from 'constants/dataGrid';
import useTable from 'hooks/useTable';

const StyledMuiPagination = styled(MuiPagination)(() => ({
  paddingTop: 10,
  '& ul': {
    justifyContent: 'flex-end'
  }
}));

const TablePagination = ({count, page, onPageChange, ...props}) => {
  const {page: tablePage, onPageChange: onChange} = useTable();

  const handlePageChange = (event, value) => {
    onChange(value);
    onPageChange(value);
  };

  if (count <= defaultPage) {
    return null;
  }

  return (
    <StyledMuiPagination
      shape="rounded"
      count={count}
      page={tablePage || page}
      onChange={handlePageChange}
      {...props}
    />
  );
};

TablePagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func
};

TablePagination.defaultProps = {
  count: 0,
  onPageChange: () => {}
};

export default React.memo(TablePagination);
