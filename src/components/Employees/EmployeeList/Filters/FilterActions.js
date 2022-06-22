import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {grey} from '@mui/material/colors';

import {useStyles, StyledIcon} from 'components/Employees/styles';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const FilterActions = ({isFiltersOpen, isFilterSelected, setIsFiltersOpen, onClearFilters}) => {
  const classes = useStyles();

  const toggleFilters = () => setIsFiltersOpen(!isFiltersOpen);

  if (isFiltersOpen) {
    return (
      <Box className={classes.filterClearContainer} data-testid="opened-filter-container">
        <Button
          data-testid="opened-filter-clean-btn"
          sx={{color: grey[900], mr: 1}}
          disabled={!isFilterSelected}
          onClick={onClearFilters}
        >
          Clean up
        </Button>
        <StyledIcon id="remove-icon" data-testid="close-icon" onClick={toggleFilters}>
          <CloseOutlinedIcon />
        </StyledIcon>
      </Box>
    );
  }

  return (
    <Box className={classes.filterClearContainer} data-testid="closed-filter-container">
      {isFilterSelected && (
        <Button
          data-testid="closed-filter-clean-btn"
          sx={{color: grey[900], mr: 1}}
          onClick={onClearFilters}
        >
          Clean up
        </Button>
      )}
      <Button
        variant="outlined"
        data-testid="filters-open-btn"
        startIcon={<FilterAltOutlinedIcon />}
        onClick={toggleFilters}
      >
        Filter
      </Button>
    </Box>
  );
};

FilterActions.propTypes = {
  isFiltersOpen: PropTypes.bool,
  isFilterSelected: PropTypes.bool,
  setIsFiltersOpen: PropTypes.func,
  onClearFilters: PropTypes.func
};

FilterActions.defaultProps = {
  isFiltersOpen: false,
  isFilterSelected: false,
  setIsFiltersOpen: () => {},
  onClearFilters: () => {}
};

export default React.memo(FilterActions);
