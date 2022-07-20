import React from 'react';
import {Box} from '@mui/material';

import useStyles from 'pages/Profile/components/styles';

const EmployeeDetails = () => {
  const classes = useStyles();

  return (
    <Box component="form" className={classes.filterContainer}>
      Employee Details
    </Box>
  );
};

export default EmployeeDetails;
