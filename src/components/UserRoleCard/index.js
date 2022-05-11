import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {useDispatch} from 'react-redux';
import {loginByToken} from '../../slices/auth';

const UserRoleCard = ({name}) => {
  const dispatch = useDispatch();

  const onUserClick = () => {
    const data = {
      profile: {name},
      token: name
    };
    dispatch(loginByToken(data));
  };

  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea onClick={onUserClick}>
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
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UserRoleCard;
