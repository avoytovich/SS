import React from 'react';
import PropTypes from 'prop-types';
import {SearchField} from 'components/Common/DataGrid';
import {Box} from '@mui/material';

import {useStyles} from 'components/Profile/styles';

const EmployeeFilters = ({search, onSearch, onClearSearch}) => {
  const classes = useStyles();

  return (
    <Box component="form" className={classes.filterContainer}>
      <SearchField
        id="employee-name-search"
        value={search}
        label="Employee"
        onChange={onSearch}
        onClear={onClearSearch}
      />
    </Box>
  );
};

EmployeeFilters.propTypes = {
  search: PropTypes.string,
  onSearch: PropTypes.func,
  onClearSearch: PropTypes.func
};

EmployeeFilters.defaultProps = {
  search: '',
  onSearch: () => {},
  onClearSearch: () => {}
};

export default React.memo(EmployeeFilters);
