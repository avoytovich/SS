import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {MultipleAutocomplete, SearchField} from 'components/Common/DataGrid';
import {Box} from '@mui/material';
import {useStyles} from 'components/Profile/styles';

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
  const options = useMemo(() => tags.map(tag => ({id: tag.id, label: tag.name})), [tags]);

  return (
    <Box component="form" className={classes.filterContainer}>
      <SearchField
        id="profile-skill-name-search"
        value={search}
        label="Skill"
        onChange={onSearch}
        onClear={onClearSearch}
      />
      <MultipleAutocomplete
        id="tags"
        label="Tags"
        options={options}
        values={filterValues}
        onSelect={onSelect}
        onChange={onSearchFilter}
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
