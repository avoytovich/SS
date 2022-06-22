import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {SearchField, GridSelect} from 'components/Common/DataGrid';
import {Box} from '@mui/material';

import {useStyles} from 'components/Employees/styles';
import FilterActions from 'components/Employees/EmployeeList/Filters/FilterActions';
import {benchOptions} from 'components/Employees/EmployeeList/constants';
import {
  filterBenchParamName,
  filterCompetencyParamName,
  filterSeniorityParamName,
  filterSpecializationParamName
} from 'constants/dataGrid';

const EmployeeFilters = ({
  search,
  bench,
  competencies,
  specializations,
  seniorities,
  competencyOptions,
  specializationOptions,
  seniorityOptions,
  onSearch,
  onClearSearch,
  onClearFilters,
  onChangeFilter
}) => {
  const classes = useStyles();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const isFilterSelected =
    search || bench || competencies.length || specializations.length || seniorities.length;

  return (
    <Box component="form" className={classes.filterContainer}>
      <Box className={classes.filterSearchContainer}>
        {!isFiltersOpen && (
          <SearchField
            id="employee-name-search"
            value={search}
            label="Search by name"
            onChange={onSearch}
            onClear={onClearSearch}
          />
        )}
        <FilterActions
          isFiltersOpen={isFiltersOpen}
          isFilterSelected={isFilterSelected}
          onClearFilters={onClearFilters}
          setIsFiltersOpen={setIsFiltersOpen}
        />
      </Box>
      {isFiltersOpen && (
        <Box className={classes.filtersContainer}>
          <SearchField
            id="employee-name-search"
            value={search}
            label="Search by name"
            minWidth="217px"
            onChange={onSearch}
            onClear={onClearSearch}
          />
          <GridSelect
            id="competencies"
            name={filterCompetencyParamName}
            multiple
            minWidth="217px"
            value={competencies}
            label="Competency"
            options={competencyOptions}
            onChange={onChangeFilter}
            onClear={onChangeFilter}
          />
          <GridSelect
            id="specializations"
            name={filterSpecializationParamName}
            multiple
            minWidth="217px"
            value={specializations}
            label="Specialization"
            options={specializationOptions}
            onChange={onChangeFilter}
            onClear={onChangeFilter}
          />
          <GridSelect
            id="levels"
            name={filterSeniorityParamName}
            multiple
            value={seniorities}
            label="Level"
            minWidth="217px"
            options={seniorityOptions}
            onChange={onChangeFilter}
            onClear={onChangeFilter}
          />
          <GridSelect
            name={filterBenchParamName}
            value={bench}
            label="Is on bench"
            minWidth={220}
            options={benchOptions}
            onChange={onChangeFilter}
            onClear={onChangeFilter}
          />
        </Box>
      )}
    </Box>
  );
};

EmployeeFilters.propTypes = {
  search: PropTypes.string,
  bench: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSearch: PropTypes.func,
  onClearSearch: PropTypes.func,
  onClearFilters: PropTypes.func
};

EmployeeFilters.defaultProps = {
  search: '',
  bench: '',
  onSearch: () => {},
  onClearSearch: () => {},
  onClearFilters: () => {}
};

export default React.memo(EmployeeFilters);
