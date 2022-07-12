import * as React from 'react';
import {Box, Typography} from '@mui/material';

import PageLayout from 'components/Common/Layout/PageLayout';
import logo from 'assets/images/Logo.svg';

const Home = () => (
  <PageLayout pageTitle="Smart Skills" includeAppName={false}>
    <Box sx={{my: 4, flex: 1, textAlign: 'center'}}>
      <img src={logo} alt="Logo" width={120} height={120} />
      <Typography variant="h4" component="h1" gutterBottom>
        Smart Skills
      </Typography>
    </Box>
  </PageLayout>
);

export default Home;
