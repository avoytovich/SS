import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {Box} from '@mui/material';

import {
  useFetchCompetenciesQuery,
  useFetchEmployeesQuery,
  useFetchSenioritiesQuery,
  useFetchSpecializationsQuery
} from 'api';

import {
  useDataGridPagination,
  useDataGridSort,
  useURLParams,
  useDataGridSearch
} from 'hooks/dataGrid';

import EmployeeTable from 'components/Employees/EmployeeList/EmployeeTable';
import EmployeeFilters from 'components/Employees/EmployeeList/Filters';
import {getEmployeeFilters, onChangeEmployeeFilter} from 'components/Employees/utils';

import {
  filterBenchParamName,
  filterCompetencyParamName,
  filterSeniorityParamName,
  filterSpecializationParamName
} from 'constants/dataGrid';

export default function EmployeeList() {
  const {role} = useSelector(state => state.auth.profile);
  const {data: {competencies = []} = {}} = useFetchCompetenciesQuery({role});
  const {data: {specializations = []} = {}} = useFetchSpecializationsQuery({role});
  const {data: {seniorities = []} = {}} = useFetchSenioritiesQuery({role});

  const {queryParams, updateURLParams, clearQueryParams} = useURLParams();
  const {sort, sortModel, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);
  const {search, onSearchChange} = useDataGridSearch(queryParams, updateURLParams);

  const {
    competenciesFilter,
    benchFilter,
    specializationFilter,
    seniorityFilter,
    specializationOptions,
    competencyOptions,
    seniorityOptions,
    onBenchFilterChange,
    onSpecializationFilterChange,
    onCompetenciesFilterChange,
    onSeniorityFilterChange
  } = getEmployeeFilters(queryParams, competencies, specializations, seniorities, updateURLParams);

  const {
    data: {employees = [], total = 0, pages = 0} = {},
    isLoading,
    isFetching
  } = useFetchEmployeesQuery({
    role,
    ...(page && {page}),
    ...(search && {search}),
    ...(sort && {sort}),
    ...(benchFilter && {[filterBenchParamName]: benchFilter}),
    ...(competenciesFilter.length > 0 && {[filterCompetencyParamName]: competenciesFilter}),
    ...(specializationFilter.length > 0 && {
      [filterSpecializationParamName]: specializationFilter
    }),
    ...(seniorityFilter.length > 0 && {[filterSeniorityParamName]: seniorityFilter})
  });

  const handleSearch = useCallback(
    value => {
      onSearchChange(value, onPageChange);
    },
    [onSearchChange, onPageChange]
  );

  const onClearSearch = useCallback(() => {
    handleSearch('');
  }, [handleSearch]);

  const handleClearFilters = useCallback(() => {
    clearQueryParams();
  }, [handleSearch]);

  const handleChangeFilter = useCallback((value, paramName) => {
    onChangeEmployeeFilter(
      paramName,
      value,
      onPageChange,
      onCompetenciesFilterChange,
      onSpecializationFilterChange,
      onSeniorityFilterChange,
      onBenchFilterChange
    );
  }, []);

  return (
    <Box data-testid="employee-list-box">
      <EmployeeFilters
        search={search}
        bench={benchFilter}
        competencies={competenciesFilter}
        specializations={specializationFilter}
        seniorities={seniorityFilter}
        competencyOptions={competencyOptions}
        specializationOptions={specializationOptions}
        seniorityOptions={seniorityOptions}
        onSearch={handleSearch}
        onClearSearch={onClearSearch}
        onClearFilters={handleClearFilters}
        onChangeFilter={handleChangeFilter}
      />
      <EmployeeTable
        rows={employees}
        page={tablePage}
        sortModel={sortModel}
        onPageChange={onPageChange}
        total={total}
        loading={isLoading || isFetching}
        isPagination={pages > 1}
        onSortChange={onSortChange}
      />
    </Box>
  );
}
