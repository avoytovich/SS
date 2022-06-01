import React, {useCallback, useMemo, useState} from 'react';

import {Box} from '@mui/material';

import {useFetchSkillsQuery} from 'api/profile';
import {useFetchTagsQuery} from 'api/tags';

import {getTagFilterByQueryParams, updateTagFilterParam} from 'components/Skills/SkillsList/utils';
import SkillListFilter from 'components/Profile/SkillList/SkillListFilter';
import SkillTable from 'components/Profile/SkillList/SkillTable';

import {
  useDataGridPagination,
  useDataGridSort,
  useURLParams,
  useDataGridSearch
} from 'hooks/dataGrid';
import {useDataGridFilter} from 'hooks/dataGrid/useDataGridFilter';

import {filterTagParamName} from 'constants/dataGrid';

export default function SkillList() {
  const [tagsSearch, setTagsSearch] = useState('');
  const {data: {tags = []} = {}} = useFetchTagsQuery({...(tagsSearch && {tagsSearch})});

  const {queryParams, updateURLParams} = useURLParams();
  const {sort, sortModel, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);
  const {search, onSearchChange} = useDataGridSearch(queryParams, updateURLParams);
  const {filter, onFilterChange} = useDataGridFilter(
    queryParams,
    updateURLParams,
    updateTagFilterParam,
    filterTagParamName,
    tags,
    getTagFilterByQueryParams
  );

  const skillsQueryOptions = useMemo(
    () => ({
      ...(page && {page}),
      ...(search && {search}),
      ...(sort && {sort}),
      ...(filter.length > 0 && {tags: filter.map(t => t.id).toString()})
    }),
    [page, search, sort, filter]
  );

  const {
    data: {skills = [], total = 0, pages = 0} = {},
    isLoading,
    isFetching
  } = useFetchSkillsQuery(skillsQueryOptions);

  const handleSearch = useCallback(
    value => {
      onSearchChange(value, onPageChange);
    },
    [onSearchChange, onPageChange]
  );

  const handleSelect = useCallback(
    value => {
      onFilterChange(value, onPageChange);
    },
    [onFilterChange, onPageChange]
  );

  const handleClearFilter = useCallback(() => {
    handleSearch('');
  }, [handleSearch]);

  return (
    <Box data-testid="profile-skill-list-box">
      <SkillListFilter
        search={search}
        tags={tags}
        filterValues={filter}
        onSelect={handleSelect}
        onSearch={handleSearch}
        onClearSearch={handleClearFilter}
        onSearchFilter={setTagsSearch}
      />
      <SkillTable
        rows={skills}
        loading={isLoading || isFetching}
        isPagination={pages > 1}
        sortModel={sortModel}
        total={total}
        page={tablePage}
        onPageChange={onPageChange}
        onSortChange={onSortChange}
      />
    </Box>
  );
}
