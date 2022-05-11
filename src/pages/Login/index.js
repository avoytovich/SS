import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import UserRoleCard from '../../components/UserRoleCard';

const Login = () => (
  <Box sx={{my: 4, flex: 1, textAlign: 'center'}}>
    <Typography variant="h4" component="h1" gutterBottom>
      Login as:
    </Typography>
    <Grid spacing={2} container justifyContent="center">
      <Grid item xs={12} md={3} lg={3}>
        <UserRoleCard name="Super Admin" />
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <UserRoleCard name="Moderator" />
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <UserRoleCard name="Manager" />
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
        <UserRoleCard name="Employee" />
      </Grid>
    </Grid>
  </Box>
);

export default Login;
