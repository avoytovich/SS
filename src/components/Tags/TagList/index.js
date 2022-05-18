import React, {useState} from 'react';

import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';

import ConfirmModal from '../../ConfirmModal';

import {useFetchTagsQuery} from '../../../api/tags';

import {GridPagination, NoRows} from '../../Common/DataGrid';
import {defaultPage, pageSize, searchParamName} from '../../../constants/dataGrid';
import {useDataGridPagination, useDataGridSort, useURLParams} from '../../../hooks/dataGrid';

import {TagListFilter} from './TagListFilter';
import {getColumns, getConfirmTagValues} from './utils';
import {tagStyles, useStyles, rootStyles} from './styles';

export default function TagList() {
  const classes = useStyles();
  const {queryParams, updateURLParams} = useURLParams();
  const {sortModel, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmValues, setConfirmValues] = useState({});
  const [search, setSearch] = useState(queryParams.get(searchParamName) || '');
  const {data: {tags = [], total = 0} = {}, isLoading, isError} = useFetchTagsQuery({page});

  const onSetConfirmValues = tag => {
    setIsConfirmOpen(true);
    setConfirmValues(getConfirmTagValues(tag));
  };

  const columns = getColumns(onSetConfirmValues);

  const onCloseConfirmModal = () => {
    setIsConfirmOpen(false);
    setConfirmValues({});
  };

  const handlePageChange = nextPage => onPageChange(nextPage);

  const resetPage = () => {
    if (page !== defaultPage) handlePageChange(0);
  };

  const handleSearch = value => {
    setSearch(value);
    resetPage();
    updateURLParams(value, searchParamName);
  };

  const handleClearFilter = () => handleSearch('');

  const handleSortChange = newModel => onSortChange(newModel);

  return (
    <>
      <TagListFilter
        onClearFilter={handleClearFilter}
        tagName={search}
        onChangeTagName={handleSearch}
      />
      <Box sx={rootStyles} data-testid="tag-list-box">
        <DataGrid
          data-cy="tag-list"
          components={{
            Pagination: GridPagination,
            NoRowsOverlay: NoRows
          }}
          componentsProps={{
            noRowsOverlay: {
              className: classes.tableEmptyMessage,
              emptyMessage: isError ? 'No tags' : 'No tags yet.',
              actionTitle: 'Please add new tag',
              isAction: !isError
            }
          }}
          rows={tags}
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
          autoHeight={tags.length === pageSize}
          sx={tagStyles}
          loading={isLoading}
          rowHeight={32}
          headerHeight={32}
          disableColumnMenu
          disableSelectionOnClick
        />
      </Box>
      <ConfirmModal
        modalOpen={isConfirmOpen}
        toggle={onCloseConfirmModal}
        bodyContent={confirmValues}
      />
    </>
  );
}
