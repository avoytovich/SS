import React from 'react';
import PropTypes from 'prop-types';

import {Avatar, Box, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {grey} from '@mui/material/colors';

export default function UserAvatar({firstName, lastName, fullName, photo, onBack, ...rest}) {
  const avatarShortName = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <Box sx={{display: 'flex', alignItems: 'center', margin: '21px 0'}} {...rest}>
      {onBack && (
        <ArrowBackIcon
          fontSize="large"
          sx={{color: grey[900], cursor: 'pointer', marginRight: '14px'}}
          onClick={onBack}
        />
      )}
      {photo ? <Avatar alt="User photo" src={photo} /> : <Avatar>{avatarShortName}</Avatar>}
      {fullName && (
        <Typography variant={'h4'} sx={{marginLeft: '16px'}}>
          {fullName}
        </Typography>
      )}
    </Box>
  );
}

UserAvatar.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  photo: PropTypes.string,
  onBack: PropTypes.func
};
