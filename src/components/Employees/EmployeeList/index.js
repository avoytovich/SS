import React, {useMemo, useCallback} from 'react';
import {useSelector} from 'react-redux';

import {Box} from '@mui/material';

import {useFetchEmployeesQuery} from 'api/employees';

import {getTagFilterByQueryParams, updateTagFilterParam} from 'components/Skills/SkillsList/utils';

import {
  useDataGridPagination,
  useDataGridSort,
  useURLParams,
  useDataGridSearch
} from 'hooks/dataGrid';
import {useDataGridFilter} from 'hooks/dataGrid/useDataGridFilter';

import {filterTagParamName} from 'constants/dataGrid';
import EmployeeTable from 'components/Employees/EmployeeList/EmployeeTable';
import EmployeeFilters from 'components/Employees/EmployeeList/EmployeeFilters';

export default function EmployeeList() {
  const {role} = useSelector(state => state.auth.profile);

  const {queryParams, updateURLParams} = useURLParams();
  const {sort, sortModel, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);
  const {search, onSearchChange} = useDataGridSearch(queryParams, updateURLParams);
  const {filter} = useDataGridFilter(
    queryParams,
    updateURLParams,
    updateTagFilterParam,
    filterTagParamName,
    [],
    getTagFilterByQueryParams
  );

  const employeesQueryOptions = useMemo(
    () => ({
      role,
      ...(page && {page}),
      ...(search && {search}),
      ...(sort && {sort}),
      ...(filter.length > 0 && {tags: filter.map(t => t.id).toString()})
    }),
    [page, search, sort, filter]
  );

  const {
    data: {employees = [], total = 0, pages = 0} = {},
    isLoading,
    isFetching
  } = useFetchEmployeesQuery(employeesQueryOptions);

  const handleSearch = useCallback(
    value => {
      onSearchChange(value, onPageChange);
    },
    [onSearchChange, onPageChange]
  );

  const handleClearFilter = useCallback(() => {
    handleSearch('');
  }, [handleSearch]);

  return (
    <Box data-testid="employee-list-box">
      <EmployeeFilters search={search} onSearch={handleSearch} onClearSearch={handleClearFilter} />
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
