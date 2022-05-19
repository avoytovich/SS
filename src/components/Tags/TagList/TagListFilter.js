import * as React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import {Box, IconButton, InputAdornment} from '@mui/material';
import {useStyles} from 'components/Tags/TagList/styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export function TagListFilter({tagName, onChangeTagName, onClearFilter}) {
  const classes = useStyles();

  const DeleteTagButton = (
    <IconButton aria-label="delete" size="small" onClick={onClearFilter}>
      <CloseOutlinedIcon fontSize="small" />
    </IconButton>
  );

  const handleTagSearch = e => onChangeTagName(e.target.value);

  return (
    <Box component="form" className={classes.filterContainer} data-testid="tag-list-filter">
      <TextField
        id="tag-name-input"
        data-testid="tag-list-filter-search"
        label="Tag Name"
        size="small"
        placeholder="Search"
        className={classes.searchField}
        onChange={handleTagSearch}
        value={tagName}
        InputProps={{
          endAdornment: <InputAdornment position="end">{tagName && DeleteTagButton}</InputAdornment>
        }}
      />
    </Box>
  );
}

TagListFilter.propTypes = {
  tagName: PropTypes.string.isRequired,
  onChangeTagName: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired
};
