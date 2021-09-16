import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Welcome() {
  return (
    <>
      <Box sx={{ my: 4 }} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Smart Skills Web App
        </Typography>
      </Box>
    </>
  );
}
