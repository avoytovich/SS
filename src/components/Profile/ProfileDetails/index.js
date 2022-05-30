import React from 'react';
import PropTypes from 'prop-types';

import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';

const InfoItem = ({title, item}) => (
  <Box sx={{display: 'flex'}}>
    <Box sx={{typography: 'body2', textAlign: 'left', mr: 1}}>{title}:</Box>
    <Box sx={{typography: 'body2', textAlign: 'left', fontWeight: 500}}>{item}</Box>
  </Box>
);

export default function ProfileDetails({competency, specialization, level}) {
  return (
    <Box sx={{mb: 1, borderBottom: `1px solid ${grey[200]}`}}>
      <Box sx={{padding: '10px 24px 24px'}}>
        <Box sx={{fontSize: 12, textAlign: 'left', fontWeight: 500, mb: '4px'}} color={grey[600]}>
          Details
        </Box>
        <Box data-cy="profile-info">
          <InfoItem title="Specialization" item={specialization} />
          <InfoItem title="Competency" item={competency} />
          <InfoItem title="Level" item={level} />
        </Box>
      </Box>
    </Box>
  );
}

ProfileDetails.propTypes = {
  competency: PropTypes.string,
  level: PropTypes.string,
  specialization: PropTypes.string
};

ProfileDetails.defaultProps = {
  competency: 'N/A',
  level: 'N/A',
  specialization: 'N/A'
};
