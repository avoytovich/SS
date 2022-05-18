import * as React from 'react';
import PropTypes from 'prop-types';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import {Button, Box} from '@mui/material';
import {useStyles} from 'components/Tags/TagList/styles';

export function TagListFilter({tagName, onChangeTagName, onClearFilter}) {
  const classes = useStyles();

  const handleTagSearch = e => onChangeTagName(e.target.value);

  return (
    <Box className={classes.filterContainer} data-testid="tag-list-filter">
      <FormControl variant="standard" className={classes.form}>
        <TextField
          id="tag-name-input"
          data-testid="tag-list-filter-search"
          label="Tag Name"
          variant="standard"
          placeholder="Search"
          onChange={handleTagSearch}
          value={tagName}
        />
        <Button
          variant="text"
          data-testid="tag-list-filter-cleanup-btn"
          size="small"
          disabled={!tagName}
          className={classes.cleanupButton}
          onClick={onClearFilter}
        >
          Clean Up
        </Button>
      </FormControl>
    </Box>
  );
}

TagListFilter.propTypes = {
  tagName: PropTypes.string.isRequired,
  onChangeTagName: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired
};
