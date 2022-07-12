import React from 'react';
import {useDispatch} from 'react-redux';

import {Box} from '@mui/material';

import {setBasicSkills} from 'store/skills';

import RecommendationSkills from './Recommendations';

export default function InputSkills() {
  const dispatch = useDispatch();

  const onSelectSkill = skill => dispatch(setBasicSkills(skill));

  return (
    <Box>
      <RecommendationSkills onSelectSkill={onSelectSkill} />
    </Box>
  );
}
