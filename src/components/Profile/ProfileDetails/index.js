import React from 'react';
import {useSelector} from 'react-redux';

import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import ProfileInfo from 'components/Profile/ProfileDetails/ProfileInfo';
import Recommendations from 'components/Profile/ProfileDetails/Recommendations';

export default function ProfileDetails() {
  const {competency, specialization, level} = useSelector(state => state.auth.profile);

  return (
    <Box sx={{display: 'flex', mb: 1, borderBottom: `1px solid ${grey[200]}`}}>
      <ProfileInfo competency={competency} specialization={specialization} level={level} />
      <Recommendations />
    </Box>
  );
}
