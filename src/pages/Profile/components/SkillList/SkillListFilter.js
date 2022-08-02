import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';

import {SearchField} from 'components/Common/DataGrid';
import {getOptions} from 'utils/dataGridUtils';
import Autocomplete from 'components/Autocomplete';

import useStyles from '../styles';

const SkillListFilter = ({
  search,
  tags,
  filterValues,
  onSelect,
  onSearchFilter,
  onSearch,
  onClearSearch
}) => {
  const classes = useStyles();
  const options = useMemo(() => getOptions(tags, 'id', 'name'), [tags, getOptions]);

  return (
    <Box component="form" className={classes.filterContainer}>
      <SearchField
        id="profile-skill-name-search"
        value={search}
        label="Skill"
        onChange={onSearch}
        onClear={onClearSearch}
      />
      <Autocomplete
        multiple
        name="tags"
        label="Tags"
        options={options}
        values={filterValues}
        onSelect={onSelect}
        onSearch={onSearchFilter}
      />
    </Box>
  );
};

SkillListFilter.propTypes = {
  search: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterValues: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
  onSearchFilter: PropTypes.func,
  onSearch: PropTypes.func,
  onClearSearch: PropTypes.func
};

SkillListFilter.defaultProps = {
  search: '',
  filterValues: [],
  onSelect: () => {},
  onSearchFilter: () => {},
  onSearch: () => {},
  onClearSearch: () => {}
};

export default React.memo(SkillListFilter);
