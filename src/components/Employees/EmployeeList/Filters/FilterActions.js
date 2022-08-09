import React from 'react';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';

import {CloseIcon, FilterAltIcon} from 'components/Icons';
import {ButtonOutlined, ButtonText, IconButton} from 'components/Button';
import useStyles from 'components/Employees/styles';

const FilterActions = ({isFiltersOpen, isFilterSelected, setIsFiltersOpen, onClearFilters}) => {
  const classes = useStyles();

  const toggleFilters = () => setIsFiltersOpen(!isFiltersOpen);

  if (isFiltersOpen) {
    return (
      <Box className={classes.filterClearContainer} data-testid="opened-filter-container">
        {/* TODO refactor to use styled-components */}
        <ButtonText
          data-testid="opened-filter-clean-btn"
          sx={{color: grey[900], mr: 1}}
          disabled={!isFilterSelected}
          onClick={onClearFilters}
        >
          Clean up
        </ButtonText>
        <IconButton id="remove-icon" data-testid="close-icon" size="small" onClick={toggleFilters}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box className={classes.filterClearContainer} data-testid="closed-filter-container">
      {isFilterSelected && (
        // TODO refactor to use styled-components
        <ButtonText
          data-testid="closed-filter-clean-btn"
          sx={{color: grey[900], mr: 1}}
          onClick={onClearFilters}
        >
          Clean up
        </ButtonText>
      )}
      <ButtonOutlined
        data-testid="filters-open-btn"
        startIcon={<FilterAltIcon />}
        onClick={toggleFilters}
      >
        Filter
      </ButtonOutlined>
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
