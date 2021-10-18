import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AlertIcon } from './icons';

export default function ErrorFallback({ error }) {
  console.error(error);
  return (
    <Grid container justifyContent="center">
      <AlertIcon sx={{ fontSize: 120 }} color="error"/>
      <Grid container justifyContent="center">
        <Typography variant="body1" color="initial">Oops. Something went wrong, please contact IT support.</Typography>
      </Grid>
    </Grid>
  );
}
ErrorFallback.propTypes = { error: PropTypes.object };
