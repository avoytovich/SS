import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PageTitle from '../components/PageTitle';
import { Logo } from '../components/icons';

export default function Welcome() {
  return (
    <>
      <PageTitle title="Smart Skills" includeAppName={false} />
      <Box sx={{ my: 4, flex: 1, textAlign: 'center' }}>
        <Logo sx={{ fontSize: 120 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Smart Skills
        </Typography>
      </Box>
    </>
  );
}
