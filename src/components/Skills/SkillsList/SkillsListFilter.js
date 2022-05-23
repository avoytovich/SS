/* eslint-disable react/display-name */
import * as React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {Box, IconButton} from '@mui/material';
import {useStyles} from 'components/Skills/SkillsList/styles';
import {CloseOutlined} from '@mui/icons-material';

const SkillsListFilter = React.memo(({skillName, onChangeSkillName, onClearFilter}) => {
  const classes = useStyles();

  const handleSkillSearch = e => onChangeSkillName(e.target.value);

  return (
    <Box className={classes.filterContainer} data-testid="skills-list-filter">
      <FormControl variant="outlined" className={classes.form}>
        <TextField
          id="tag-name-input"
          data-testid="skills-list-filter-search"
          label="Skill"
          variant="outlined"
          size="small"
          placeholder="Search"
          InputProps={{
            endAdornment: (
              <IconButton size="small" onClick={onClearFilter}>
                <CloseOutlined fontSize="inherit" />
              </IconButton>
            )
          }}
          onChange={handleSkillSearch}
          value={skillName}
        />
      </FormControl>
    </Box>
  );
});

export default SkillsListFilter;

SkillsListFilter.propTypes = {
  tagName: PropTypes.string.isRequired,
  onChangeTagName: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired
};
