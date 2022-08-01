import PropTypes from 'prop-types';

import {BoxOutlined} from 'components/Box';
import {ChipContained} from 'components/Chip';

const SeniorityGroup = ({
  name,
  skills,
  onDeleteSkill,
  selectedSkills,
  onSelectSkill,
  onClickGroup
}) => {
  const handleDeleteSkill = skill => {
    if (onDeleteSkill) onDeleteSkill(name, skill);
  };

  const handleSelectSkill = skill => {
    if (onSelectSkill) onSelectSkill(name, skill);
  };

  const handleClickOnGroup = () => {
    if (onClickGroup) onClickGroup(name);
  };

  return (
    <BoxOutlined
      onClick={() => {
        handleClickOnGroup(name);
      }}
    >
      {skills &&
        skills.map(skill => (
          <ChipContained
            key={skill.id}
            label={skill.name}
            selected={selectedSkills.length > 0 && selectedSkills.indexOf(skill.id) > -1}
            onClick={() => {
              handleSelectSkill(skill);
            }}
            onDelete={() => {
              handleDeleteSkill(skill);
            }}
          />
        ))}
    </BoxOutlined>
  );
};

SeniorityGroup.propTypes = {
  selectedSkills: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  onDeleteSkill: PropTypes.func.isRequired,
  onSelectSkill: PropTypes.func.isRequired,
  onClickGroup: PropTypes.func.isRequired,
  skills: PropTypes.array.isRequired
};

export default SeniorityGroup;
