import {getOptions} from 'utils/dataGridUtils';
import useDataGridFilter from 'hooks/dataGrid/useDataGridFilter';
import {
  filterBenchParamName,
  filterCompetencyParamName,
  filterSeniorityParamName,
  filterSpecializationParamName
} from 'constants/dataGrid';
import {benchOptions} from 'components/Employees/EmployeeList/constants';

export const updateFilterParam = (value, updateURLParams, isMultiple, filterParamName) => {
  updateURLParams(value.toString(), filterParamName);
};

export const getBenchFilterByQueryParams = (params, data) => {
  const selectedParams = data.find(t => t.id === params);

  return selectedParams ? selectedParams.id : '';
};

export const getFilterByQueryParams = params => params.split(',').map(p => +p);

export const getEmployeeFilters = (
  queryParams,
  competencies,
  specializations,
  seniorities,
  updateURLParams
) => {
  const competencyOptions = getOptions(competencies, 'id', 'name');
  const specializationOptions = getOptions(specializations, 'id', 'name');
  const seniorityOptions = getOptions(seniorities, 'id', 'name');

  const {filter: competenciesFilter, onFilterChange: onCompetenciesFilterChange} =
    useDataGridFilter(
      queryParams,
      updateURLParams,
      updateFilterParam,
      filterCompetencyParamName,
      competencies,
      getFilterByQueryParams
    );

  const {filter: specializationFilter, onFilterChange: onSpecializationFilterChange} =
    useDataGridFilter(
      queryParams,
      updateURLParams,
      updateFilterParam,
      filterSpecializationParamName,
      specializations,
      getFilterByQueryParams
    );

  const {filter: seniorityFilter, onFilterChange: onSeniorityFilterChange} = useDataGridFilter(
    queryParams,
    updateURLParams,
    updateFilterParam,
    filterSeniorityParamName,
    seniorities,
    getFilterByQueryParams
  );

  const {filter: benchFilter, onFilterChange: onBenchFilterChange} = useDataGridFilter(
    queryParams,
    updateURLParams,
    updateFilterParam,
    filterBenchParamName,
    benchOptions,
    getBenchFilterByQueryParams,
    false
  );

  return {
    competenciesFilter,
    benchFilter,
    specializationFilter,
    seniorityFilter,
    competencyOptions,
    specializationOptions,
    seniorityOptions,
    onCompetenciesFilterChange,
    onBenchFilterChange,
    onSpecializationFilterChange,
    onSeniorityFilterChange
  };
};

export const onChangeEmployeeFilter = (
  name,
  value,
  onPageChange,
  onCompetenciesChange,
  onSpecializationChange,
  onSeniorityChange,
  onBenchChange
) => {
  switch (name) {
    case filterCompetencyParamName:
      onCompetenciesChange(value, onPageChange);
      break;
    case filterSpecializationParamName:
      onSpecializationChange(value, onPageChange);
      break;
    case filterSeniorityParamName:
      onSeniorityChange(value, onPageChange);
      break;
    case filterBenchParamName:
      onBenchChange(value, onPageChange);
      break;
    default:
      break;
  }
};
