import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function ErrorFallback({ error }) {
  console.log(error);
  return (
    <Grid container justifyContent="center">
      <img src="/alert.png" alt="image"/>
      <Grid container justifyContent="center">
      <Typography variant="body1" color="initial">Oops.Something went wrong, please contact IT support.</Typography>
      </Grid>
    </Grid>
  );
}
ErrorFallback.propTypes = { error: PropTypes.object };
