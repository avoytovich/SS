import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';

import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';

import {useDeleteTagMutation, useFetchTagsQuery} from 'api/tags';

import ConfirmModal from 'components/Modals/ConfirmModal';
import {GridPagination, NoRows, SearchField, dataGridRootStyles} from 'components/Common/DataGrid';
import {
  useDataGridPagination,
  useDataGridSort,
  useURLParams,
  useDataGridSearch
} from 'hooks/dataGrid';

import {getColumns, getConfirmTagValues} from 'components/Tags/TagList/utils';
import {pageSize} from 'constants/dataGrid';
import {useStyles} from 'components/Tags/TagList/styles';

export default function TagList({onSaveOrUpdate}) {
  const classes = useStyles();
  const {queryParams, updateURLParams, clearQueryParams} = useURLParams();
  const {sort, sortModel, onSortChange} = useDataGridSort(queryParams, updateURLParams);
  const {page, tablePage, onPageChange} = useDataGridPagination(queryParams, updateURLParams);
  const {search, onSearchChange} = useDataGridSearch(queryParams, updateURLParams);
  const [deleteConfirmModalValues, setDeleteConfirmModalValues] = useState(null);
  const queryOptions = useMemo(
    () => ({...(page && {page}), ...(search && {search}), ...(sort && {sort})}),
    [page, search, sort]
  );
  const {
    data: {tags = [], total = 0, pages = 0} = {},
    isLoading,
    isFetching,
    isError
  } = useFetchTagsQuery(queryOptions);
  const [deleteTag] = useDeleteTagMutation();

  const isFilterSelected = search || sort;

  const onSetConfirmValues = tag => setDeleteConfirmModalValues(getConfirmTagValues(tag));

  const handleEditTag = tag => {
    onSaveOrUpdate({
      tagName: tag.name,
      ...tag
    });
  };

  const onCreateTag = () => onSaveOrUpdate();

  const columns = getColumns(handleEditTag, onSetConfirmValues);

  const onCloseConfirmModal = () => setDeleteConfirmModalValues(null);

  const onClearFilters = () => {
    if (tags.length === 1) {
      clearQueryParams();
    }
  };

  const handConfirmRemove = () => {
    onClearFilters();
    deleteTag({id: deleteConfirmModalValues.tagId});
    onCloseConfirmModal();
  };

  const handlePageChange = nextPage => onPageChange(nextPage);

  const handleSearch = value => onSearchChange(value, onPageChange);

  const handleClearFilter = () => handleSearch('');

  const handleSortChange = newModel => onSortChange(newModel);

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
            Pagination: pages > 1 && GridPagination,
            NoRowsOverlay: NoRows
          }}
          componentsProps={{
            noRowsOverlay: {
              className: classes.tableEmptyMessage,
              emptyMessage:
                isError || isFilterSelected
                  ? 'No tags. Please select other filters'
                  : 'No tags yet',
              actionTitle: 'Please add new tag',
              isAction: !isError && !isFilterSelected,
              onAddNewRow: onCreateTag
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
          loading={isLoading || isFetching}
          rowHeight={33}
          headerHeight={33}
          disableColumnMenu
          disableSelectionOnClick
          autoHeight
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
    </>
  );
}

TagList.propTypes = {
  onSaveOrUpdate: PropTypes.func.isRequired
};
