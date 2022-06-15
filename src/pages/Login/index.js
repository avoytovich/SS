import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setPermissions} from 'store/permissions/permissions';
import Typography from '@mui/material/Typography';
import {Avatar, Box, Card, CardActionArea, CardContent} from '@mui/material';
import Grid from '@mui/material/Grid';
import {loginByToken} from 'slices/auth';
import userRoles from 'constants/userRoles';
import {useSigninUserMutation} from 'api/auth';
import {USER_ROLES_PERMISSIONS} from 'constants/permissions';
import logo from 'assets/images/Logo.svg';

export default function Login() {
  const dispatch = useDispatch();
  const [signinUser, {data, isSuccess}] = useSigninUserMutation();

  const onUserClick = role => () => {
    console.log(USER_ROLES_PERMISSIONS[role.id]);
    // TODO: Replece to  role from profile
    dispatch(setPermissions(USER_ROLES_PERMISSIONS[role.id]));
    signinUser({role: role.id});
  };

  const UserCard = ({role}) => (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea data-testid={`user-card-${role.id}`} onClick={onUserClick(role)}>
        <CardContent>
          <Box justifyContent="center" display="flex">
            <Avatar
              style={{
                width: '60px',
                height: '60px'
              }}
            />
          </Box>
          <Typography textAlign="center" gutterBottom variant="h5" component="div">
            {role.label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(loginByToken(data));
    }
  }, [isSuccess]);

  return (
    <>
      <Box sx={{my: 6, textAlign: 'center'}} data-testid="login-content">
        <img src={logo} alt="Logo" width={120} height={120} />
        <Typography variant="h4" component="h1" gutterBottom>
          Smart Skills
        </Typography>
      </Box>
      <Box sx={{my: 6, flex: 1, textAlign: 'center'}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login as:
        </Typography>
        <Grid spacing={2} container justifyContent="center">
          {Object.values(userRoles).map(role => (
            <Grid item xs={12} md={3} lg={3} key={role.id}>
              <UserCard role={role} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
