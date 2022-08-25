import {useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import {useFetchAutocompleteSkillsQuery} from 'services/skills';
import {filterObjectArray} from 'utils/helpers';
import {SKILLS_LEVELS} from 'constants/common';
import Autocomplete from 'components/Autocomplete';

import AutocompletePaper from './AutocompletePaper';

const SkillsAutocomplete = ({onSelectSkill, onProposeSkill}) => {
  const allSkills = useSelector(state => state.skills);
  const senioritySkills = [
    ...allSkills[SKILLS_LEVELS.BASIC],
    ...allSkills[SKILLS_LEVELS.ADVANCED],
    ...allSkills[SKILLS_LEVELS.INTERMEDIATE]
  ];

  const {data: skills = []} = useFetchAutocompleteSkillsQuery(undefined, {
    selectFromResult: result => ({
      ...result,
      data: filterObjectArray(result.data, senioritySkills)
    })
  });
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleSelectSkill = (event, newValue) => {
    setSelectedSkill(newValue.id);
    onSelectSkill(newValue);
  };

  return (
    <Autocomplete
      name="skills-autocomplete"
      key={selectedSkill}
      options={skills}
      fullWidth
      label="Inputed skill appears in Basic level"
      getOptionLabel={option => option.name}
      PaperComponent={AutocompletePaper}
      componentsProps={{
        paper: {
          onClick: onProposeSkill
        }
      }}
      onSelect={handleSelectSkill}
    />
  );
};

SkillsAutocomplete.propTypes = {
  onSelectSkill: PropTypes.func.isRequired,
  onProposeSkill: PropTypes.func.isRequired
};

export default SkillsAutocomplete;
