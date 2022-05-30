import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';

import {useFetchSkillsQuery} from 'api/profile';

import {GridPagination, NoRows, dataGridRootStyles, SearchField} from 'components/Common/DataGrid';
import {
  useDataGridPagination,
  useDataGridSort,
  useURLParams,
  useDataGridSearch
} from 'hooks/dataGrid';
import {pageSize} from 'constants/dataGrid';

const columns = [
  {
    field: 'name',
    headerName: 'Skill name',
    minWidth: 120,
    flex: 5
  },
  {
    field: 'description',
    headerName: 'Description',
    minWidth: 90,
    flex: 3,
    sortable: false
  },
  {
    field: 'seniority',
    headerName: 'Seniority',
    minWidth: 90,
    flex: 1
  }
];

export default function SkillList({id}) {
  const {queryParams, updateURLParams} = useURLParams();
  const {sort, sortModel, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);
  const {search, onSearchChange} = useDataGridSearch(queryParams, updateURLParams);
  const queryOptions = useMemo(
    () => ({id, ...(page && {page}), ...(search && {search}), ...(sort && {sort})}),
    [page, search, sort]
  );
  const {
    data: {skills = [], total = 0, pages = 0} = {},
    isLoading,
    isFetching
  } = useFetchSkillsQuery(queryOptions);

  const handlePageChange = nextPage => onPageChange(nextPage);

  console.log(sort, page, search);

  const handleSortChange = newModel => onSortChange(newModel);

  const handleSearch = value => onSearchChange(value, onPageChange);

  const handleClearFilter = () => handleSearch('');

  return (
    <Box component="form" data-testid="profile-skill-list-box">
      <Box sx={{ml: 2, mt: 2, mb: 2}}>
        <SearchField
          id="profile-skill-name-search"
          value={search}
          label="Skill"
          onChange={handleSearch}
          onClear={handleClearFilter}
        />
      </Box>

      <DataGrid
        components={{
          Pagination: pages > 1 && GridPagination,
          NoRowsOverlay: NoRows
        }}
        componentsProps={{
          noRowsOverlay: {
            emptyMessage: 'No skills',
            sx: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }
          }
        }}
        rows={skills}
        page={tablePage}
        columns={columns}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortChange}
        paginationMode="server"
        pagination
        rowsPerPageOptions={[pageSize]}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        rowCount={total}
        sx={dataGridRootStyles}
        loading={isLoading || isFetching}
        rowHeight={33}
        headerHeight={33}
        disableColumnMenu
        disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
}

SkillList.propTypes = {
  id: PropTypes.string.isRequired
};
