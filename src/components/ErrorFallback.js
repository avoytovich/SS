import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import alert from 'assets/images/Alert.svg';

export default function ErrorFallback({error}) {
  console.error(error);
  return (
    <Grid container flexDirection="column" alignItems="center">
      <img src={alert} alt="Alert Icon" />
      <Typography variant="body1" color="initial">
        Oops.Something went wrong, please contact IT support.
      </Typography>
    </Grid>
  );
}
ErrorFallback.propTypes = {error: PropTypes.object};
