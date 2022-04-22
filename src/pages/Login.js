import * as React from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import CardActionArea from '@mui/material/CardActionArea';
import { loginByToken } from '../slices/auth';

export default function Login() {
  const dispatch = useDispatch();

  const onUserClick = name => () => {
    const data = {
      profile: { name },
      token: name,
    };
    dispatch(loginByToken(data));
  };

  const UserCard = ({ name }) => (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={onUserClick(name)}>
        <CardContent>
          <Box justifyContent="center" display="flex">
            <Avatar
              style={{
                width: '60px',
                height: '60px',
              }}
            />
          </Box>
          <Typography textAlign="center" gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  return (
    <Box sx={{ my: 4, flex: 1, textAlign: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login as:
      </Typography>
      <Grid spacing={2} container justifyContent="center">
        <Grid item xs={12} md={3} lg={3}>
          <UserCard name="Super Admin" />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <UserCard name="Moderator" />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <UserCard name="Manager" />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <UserCard name="Employee" />
        </Grid>
      </Grid>
    </Box>
  );
}
