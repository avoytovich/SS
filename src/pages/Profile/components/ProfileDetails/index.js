import React from 'react';
import {useSelector} from 'react-redux';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';

import ProfileInfo from './ProfileInfo';
import Recommendations from './Recommendations';

export default function ProfileDetails() {
  const {competency, specialization, seniority} = useSelector(state => state.auth.profile);

  return (
    <Box sx={{display: 'flex', mb: 1, borderBottom: `1px solid ${grey[200]}`}}>
      <ProfileInfo competency={competency} specialization={specialization} seniority={seniority} />
      <Recommendations />
    </Box>
  );
}
