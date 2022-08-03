import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {styled} from '@mui/material/styles';

import {useFetchRecommendedSkillsQuery} from 'services/profile';
import {filterObjectArray} from 'utils/helpers';
import {Box} from 'components/Box';
import Paragraph from 'components/Typography/components/Paragraph';

import {SKILLS_LEVELS} from '../../../../constants/common';

import Skills from './Skills';

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '120px',
  padding: '8px',
  marginTop: '16px',
  borderRadius: '8px',
  backgroundColor: theme.palette.grey.A100
}));

export default function RecommendationSkills({onSelectSkill}) {
  const allSkills = useSelector(state => state.skills);
  const senioritySkills = [
    ...allSkills[SKILLS_LEVELS.BASIC],
    ...allSkills[SKILLS_LEVELS.ADVANCED],
    ...allSkills[SKILLS_LEVELS.INTERMEDIATE],
    ...allSkills[SKILLS_LEVELS.EXPERT]
  ];

  const {data: skills = []} = useFetchRecommendedSkillsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      data: filterObjectArray(result.data, senioritySkills)
    })
  });

  const handleSelectSkill = useCallback(
    skill => {
      onSelectSkill(skill);
    },
    [onSelectSkill]
  );

  return (
    <StyledBox data-testid="input-skills-recommendation-box">
      <Paragraph size="sm" data-testid="input-skills-recommendation-title">
        Recommendations based on your profile
      </Paragraph>
      {skills.length > 0 && <Skills skills={skills} onSelectSkill={handleSelectSkill} />}
    </StyledBox>
  );
}
