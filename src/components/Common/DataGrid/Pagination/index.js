import * as React from 'react';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';

export function GridPagination({shape, ...rest}) {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const onChangePage = (event, value) => apiRef.current.setPage(value - 1);

  return (
    <Pagination {...rest} shape={shape} count={pageCount} page={page + 1} onChange={onChangePage} />
  );
}

GridPagination.propTypes = {
  shape: PropTypes.string
};

GridPagination.defaultProps = {
  shape: 'rounded'
};
