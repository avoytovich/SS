import {useState} from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {Autocomplete, InputAdornment, TextField} from '@mui/material';
import {styled} from '@mui/material/styles';

import {useFetchAutocompleteSkillsQuery} from 'services/skills';
import {filterObjectArray} from 'utils/helpers';

import {SKILLS_LEVELS} from '../../../../../constants/common';

import AutocompletePaper from './AutocompletePaper';

const AutocompleteOption = styled('li')(({theme}) => ({
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  padding: 0,
  '&.MuiAutocomplete-option': {
    margin: 0
  }
}));

const AutocompleteInputStyled = styled(TextField)(() => ({
  marginTop: '16px',
  '.MuiAutocomplete-input': {
    fontSize: 16
  }
}));

const SkillsAutocomplete = ({onSelectSkill, onProposeSkill}) => {
  const allSkills = useSelector(state => state.skills);
  const senioritySkills = [
    ...allSkills[SKILLS_LEVELS.BASIC],
    ...allSkills[SKILLS_LEVELS.ADVANCED],
    ...allSkills[SKILLS_LEVELS.INTERMEDIATE],
    ...allSkills[SKILLS_LEVELS.EXPERT]
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
      id="skills-autocomplete"
      data-testid="input-skills-box-autocomplete"
      key={selectedSkill}
      options={skills}
      fullWidth
      noOptionsText="Not found"
      getOptionLabel={option => option.name}
      PaperComponent={AutocompletePaper}
      renderOption={(props, option) => (
        <AutocompleteOption {...props}>{option.name}</AutocompleteOption>
      )}
      componentsProps={{
        paper: {
          onClick: onProposeSkill
        }
      }}
      onChange={handleSelectSkill}
      renderInput={params => (
        <AutocompleteInputStyled
          {...params}
          fullWidth
          placeholder="Inputed skill appears in Basic level"
          variant="outlined"
          hiddenLabel
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: <InputAdornment position="end" />
          }}
        />
      )}
    />
  );
};

SkillsAutocomplete.propTypes = {
  onSelectSkill: PropTypes.func.isRequired,
  onProposeSkill: PropTypes.func.isRequired,
  onFetchSelectedSkills: PropTypes.func.isRequired
};

export default SkillsAutocomplete;
