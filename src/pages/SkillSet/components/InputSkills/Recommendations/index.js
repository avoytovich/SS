import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {styled} from '@mui/material/styles';

import {useFetchRecommendedSkillsQuery} from 'services/profile';
import {filterObjectArray} from 'utils/helpers';
import {Box} from 'components/Box';
import Paragraph from 'components/Typography/components/Paragraph';

import SkillsSkeleton from './SkillsSkeleton';
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

export default function RecommendationSkills({onSelectSkill, onFetchSelectedSkills}) {
  const {senioritySkills} = useSelector(state => state.skills);
  const {data: skills = [], isLoading} = useFetchRecommendedSkillsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      data: filterObjectArray(result.data, senioritySkills)
    })
  });

  const handleSelectSkill = useCallback(
    skill => {
      onSelectSkill(skill);
      onFetchSelectedSkills();
    },
    [onSelectSkill, onFetchSelectedSkills]
  );

  return (
    <StyledBox data-testid="input-skills-recommendation-box">
      <Paragraph size="sm" data-testid="input-skills-recommendation-title">
        Recommendations based on your profile
      </Paragraph>
      {isLoading && !skills.length ? (
        <SkillsSkeleton />
      ) : (
        <Skills skills={skills} onSelectSkill={handleSelectSkill} />
      )}
    </StyledBox>
  );
}
