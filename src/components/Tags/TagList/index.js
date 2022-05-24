import React, {useState, useMemo} from 'react';

import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';

import ConfirmModal from 'components/Modals/ConfirmModal';

import {useDeleteTagMutation, useFetchTagsQuery} from 'api/tags';

import {GridPagination, NoRows, SearchField, dataGridRootStyles} from 'components/Common/DataGrid';
import {defaultPage, pageSize, searchParamName} from 'constants/dataGrid';
import {useDataGridPagination, useDataGridSort, useURLParams} from 'hooks/dataGrid';

import {getColumns, getConfirmTagValues} from 'components/Tags/TagList/utils';
import TagModal from 'components/Tags/TagModal';
import {useStyles} from 'components/Tags/TagList/styles';

export default function TagList() {
  const classes = useStyles();
  const {queryParams, updateURLParams} = useURLParams();
  const {sort, sortModel, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);
  const [search, setSearch] = useState(queryParams.get(searchParamName) || '');
  const [editModalValues, setEditModalValues] = useState(null);
  const [deleteConfirmModalValues, setDeleteConfirmModalValues] = useState(null);
  const queryOptions = useMemo(
    () => ({...(page && {page}), ...(search && {search}), ...(sort && {sort})}),
    [page, search, sort]
  );
  const {data: {tags = [], total = 0} = {}, isLoading, isError} = useFetchTagsQuery(queryOptions);
  const [deleteTag] = useDeleteTagMutation();

  const onSetConfirmValues = tag => {
    setDeleteConfirmModalValues(getConfirmTagValues(tag));
  };

  const onEditTag = tag => {
    setEditModalValues({
      open: true,
      tagName: tag.name,
      ...tag
    });
  };

  const columns = getColumns(onEditTag, onSetConfirmValues);

  const onCloseConfirmModal = () => setDeleteConfirmModalValues(null);

  const handConfirmRemove = () => {
    deleteTag({id: deleteConfirmModalValues.tagId});
    onCloseConfirmModal();
  };

  const handlePageChange = nextPage => onPageChange(nextPage);

  const resetPage = () => {
    if (page !== defaultPage) {
      handlePageChange(0);
    }
  };

  const handleSearch = value => {
    setSearch(value);
    resetPage();
    updateURLParams(value, searchParamName);
  };

  const handleClearFilter = () => handleSearch('');

  const handleSortChange = newModel => onSortChange(newModel);

  const handleCloseModal = () => setEditModalValues(null);

  return (
    <>
      <Box component="form" className={classes.filterContainer} data-testid="tag-list-filter">
        <SearchField
          id="tag-name-search"
          value={search}
          label="Tag Name"
          onChange={handleSearch}
          onClear={handleClearFilter}
        />
      </Box>
      <Box className={classes.tagBox} data-testid="tag-list-box">
        <DataGrid
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
          sx={dataGridRootStyles}
          loading={isLoading}
          rowHeight={33}
          headerHeight={33}
          disableColumnMenu
          disableSelectionOnClick
        />
      </Box>
      {deleteConfirmModalValues && (
        <ConfirmModal
          modalOpen={deleteConfirmModalValues.isOpen || false}
          toggle={onCloseConfirmModal}
          bodyContent={deleteConfirmModalValues}
          handleSubmit={handConfirmRemove}
        />
      )}
      {editModalValues && (
        <TagModal
          isOpen={editModalValues?.open || false}
          onClose={handleCloseModal}
          {...editModalValues}
        />
      )}
    </>
  );
}
