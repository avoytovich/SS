import React from 'react';
import {useSelector} from 'react-redux';
import {Box, Chip, Skeleton} from '@mui/material';

import {useFetchRecommendedSkillsQuery} from 'services/profile';

import {StyledBox, StyledTypography, StyledSkillsBox} from '../styles';

export default function RecommendationSkills({onSelectSkill}) {
  const {role} = useSelector(state => state.auth.profile);
  const {basicSkills} = useSelector(state => state.skills);
  const {data: {skills = []} = {}, isLoading} = useFetchRecommendedSkillsQuery({role});

  const isSkillSelected = skillId => basicSkills.find(skill => skill.id === skillId);

  const renderSkills = () => (
    <StyledSkillsBox>
      {skills.map(skill => (
        <Chip
          sx={{
            display: isSkillSelected(skill.id) ? 'none' : 'inline-flex'
          }}
          key={skill.id}
          label={skill.name}
          variant="outlined"
          onClick={() => onSelectSkill(skill)}
        />
      ))}
    </StyledSkillsBox>
  );

  const renderSkeleton = () => (
    <Box>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" width={210} />
    </Box>
  );

  return (
    <StyledBox>
      <StyledTypography variant="body2">Recommendations based on your profile</StyledTypography>
      {isLoading && !skills.length ? renderSkeleton() : renderSkills()}
    </StyledBox>
  );
}
