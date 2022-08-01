import React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';

import {Box} from 'components/Box';
import {ChipOutlined} from 'components/Chip';
import EmptyStatus from 'components/EmptyStatus';

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  margin: '8px 0',
  flexWrap: 'wrap'
}));

const Skills = ({skills, onSelectSkill}) => {
  const recommendationSkills = skills?.slice(0, 20);

  if (!skills.length) {
    return <EmptyStatus>There are no recommendation for you.</EmptyStatus>;
  }

  return (
    <StyledBox>
      {recommendationSkills.map(skill => (
        <ChipOutlined key={skill.id} label={skill.name} onClick={() => onSelectSkill(skill)} />
      ))}
    </StyledBox>
  );
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  onSelectSkill: PropTypes.func.isRequired
};

export default React.memo(Skills);
