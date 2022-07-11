import React from 'react';
import {Box} from '@mui/material';

import useStyles from 'components/Profile/styles';

const EmployeeDetails = () => {
  const classes = useStyles();

  return (
    <Box component="form" className={classes.filterContainer}>
      Employee Details
    </Box>
  );
};

export default EmployeeDetails;
