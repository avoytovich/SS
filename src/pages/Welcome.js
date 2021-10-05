import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageTitle from '../components/PageTitle';

export default function Welcome() {
  return (
    <>
      <PageTitle title="Smart Skills" />
      <Box sx={{ my: 4 }} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Smart Skills Web App
        </Typography>
      </Box>
    </>
  );
}
